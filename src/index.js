/* eslint-disable no-restricted-syntax, import/no-default-export */
import * as t from 'babel-types'


const getDisplayName = (pPath) => {
  let namedNode

  pPath.find((path) => {
    // const X = styled
    if (path.isAssignmentExpression()) {
      namedNode = path.node.left
      // const X = { Y: styled }
    }
    else if (path.isObjectProperty()) {
      namedNode = path.node.key
      // let X; X = styled
    }
    else if (path.isVariableDeclarator()) {
      namedNode = path.node.id
    }
    else if (path.isStatement()) {
      // we've hit a statement, we should stop crawling up
      return true
    }

    // we've got an displayName (if we need it) no need to continue
    if (namedNode) return true

    return false
  })

  // foo.bar -> bar
  if (t.isMemberExpression(namedNode)) {
    namedNode = namedNode.property
  }

  // identifiers are the only thing we can reliably get a name from
  return t.isIdentifier(namedNode) ? namedNode.name : undefined
}


const importLocalName = (name, state) => {
  let localName = name === 'default' ? 'styled' : name

  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        const { node } = path

        if (node.source.value === 'styled-components') {
          for (const specifier of path.get('specifiers')) {
            if (specifier.isImportDefaultSpecifier()) {
              localName = specifier.node.local.name
            }

            if (specifier.isImportSpecifier() && specifier.node.imported.name === name) {
              localName = specifier.node.local.name
            }

            if (specifier.isImportNamespaceSpecifier()) {
              localName = specifier.node.local.name
            }
          }
        }
      },
    },
  })

  return localName
}


const isStyled = (tag, state) => {
  if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name !== 'default') {
    // styled.something()
    return isStyled(tag.callee.object, state)
  }
  return (
    (t.isMemberExpression(tag) && tag.object.name === importLocalName('default', state))
      || (t.isCallExpression(tag) && tag.callee.name === importLocalName('default', state))

      /**
       * styled-components might be imported using a require()
       * call and assigned to a variable of any name.
       * - styled.default.div``
       * - styled.default.something()
       */
      || (state.styledRequired && t.isMemberExpression(tag) && t.isMemberExpression(tag.object) && tag.object.property.name === 'default' && tag.object.object.name === state.styledRequired)
      || (state.styledRequired && t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name === 'default' && tag.callee.object.name === state.styledRequired)
  )
}

const addConfig = (path, displayName) => {
  const withConfigProps = [
    t.objectProperty(t.identifier('displayName'), t.stringLiteral(displayName)),
    t.objectProperty(t.identifier('componentId'), t.stringLiteral(displayName)),
  ]

  // eslint-disable-next-line no-param-reassign
  path.node.tag = t.callExpression(
    t.memberExpression(path.node.tag, t.identifier('withConfig')),
    [t.objectExpression(withConfigProps)]
  )
}


export default () => ({
  name: 'styled-name',
  visitor: {
    TaggedTemplateExpression(path, state) {
      if (isStyled(path.node.tag, state)) {
        const displayName = getDisplayName(path)

        addConfig(path, displayName)
      }
    },
  },
})
