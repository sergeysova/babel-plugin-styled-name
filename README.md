# babel-plugin-styled-name

Add displayName for styled-components.

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

const BorderedButton = styled(Button)`
  border: 1px solid black;
`

export const GrayBorderedButton = styled(BorderedButton)`
  background-color: gray;
`
```

Out:

```js
const Button = styled.button`
  color: red;
`
Button.displayName = 'Button'


const BorderedButton = styled(Button)`
  border: 1px solid black;
`
BorderedButton.displayName = 'BorderedButton'

export const GrayBorderedButton = styled(BorderedButton)`
  background-color: gray;
`
GrayBorderedButton.displayName = 'GrayBorderedButton'
```


## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["styled-name"]
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
