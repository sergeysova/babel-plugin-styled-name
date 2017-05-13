import * as t from 'babel-types'

function buildDisplayName(name) {
  return t.expressionStatement(
    t.assignmentExpression('=',
      t.memberExpression(t.identifier(name), t.identifier('displayName')),
      t.stringLiteral(name)
    )
  )
}

function applyForVarDecl(path) {
  const varDeclarator = path.findParent(parent => parent.isVariableDeclarator())

  if (varDeclarator && varDeclarator.node.id.type === 'Identifier') {
    const targetName = varDeclarator.node.id.name

    const parent = varDeclarator.parentPath

    if (parent.parentPath.isExportNamedDeclaration()) {
      parent.parentPath.insertAfter(buildDisplayName(targetName))
    } else {
      parent.insertAfter(buildDisplayName(targetName))
    }
  }
}

export default () => ({
  name: 'styled-name',
  visitor: {
    Identifier(path) {
      if (path.node.name === 'styled') {
        if (path.parentPath.isMemberExpression()) {
          applyForVarDecl(path)
        } else if (path.parentPath.isCallExpression()) {
          applyForVarDecl(path)
        }
      }
    },
  },
})
