const { resolve } = require('path')
const { transform } = require('babel-core')

global.testPlugin = function testPlugin(code) {
  const result = transform(code, {
    plugins: [resolve(__dirname, '..', 'lib', 'index.js')],
  });

  return result.code;
}


global.example1 = "const Button = styled.button` color: red `; const Foo = styled(Button)`display: block`;"
