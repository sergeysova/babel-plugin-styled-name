# babel-plugin-styled-name

Add `displayName` and `componentId` for styled-components.

## Installation

```sh
$ npm install babel-plugin-styled-name --save-dev
```

## Example

In:

```js
const Button = styled.button`
  color: red;
`
```

Out:

```js
const Button = styled.button.withConfig({ displayName: 'Button', componentId: 'Button' })`
  color: red;
`
```

> Improve readability in devTools


## Usage

Use only for development!

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "env": {
    "development": {
      "plugins": ["styled-name"]
    }
  }
}
```

### Via CLI

```sh
$ babel --plugins styled-name script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['styled-name']
});
```
