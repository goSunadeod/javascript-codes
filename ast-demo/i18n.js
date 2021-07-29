const j = require('jscodeshift');

const i18Source = {
  en: {
    tips: 'this is tips',
    btn: 'this is button',
    popover: 'popover tooltips'
  },
  zh: {
    tips: '这是一段提示',
    btn: '这是按钮',
    popover: '气泡提示'
  }
};

const I18_LIB = 'react-intl';
const I18_HOOK = 'useI18n';
const I18_FUNC = 't';

const component = `
import React from 'react'
import { Button, Toast, Popover } from 'components'

const Comp = (props) => {
  const tips = () => {
    Toast.info('这是一段提示')
    Toast({
    	text: '这是一段提示'
    })
  }
  return (
    <div>
      <Button onClick={tips}>这是按钮</Button>
      <Popover tooltip='气泡提示' />
    </div>
  )
}
function a() {}
export default Comp
`;

// 把map的key-value反过来 用来匹配中文对应的key。
function makeReverseMap(map) {
  const reverse = {};
  for (let key in map) {
    reverse[map[key]] = key;
  }
  return reverse;
}

const reverseCnMap = makeReverseMap(i18Source.zh);

// 找到i18n对应的key
function findI18nKey(value) {
  const matchKey = reverseCnMap[value];
  return matchKey;
}

const root = j(component);

// 在react之后插入import
const insertImport = () => {
  root
    .find(j.ImportDeclaration, { source: { value: 'react' } })
    .at(0)
    .insertAfter(
      j.importDeclaration([j.importSpecifier(j.identifier(I18_HOOK))], j.literal(I18_LIB))
    );
};

// 插入作者注释
const insertUser = () => {
  root.get().node.program.body.unshift('// 作者：MMYYDS');
};

// 插入国际化初始化声明
const insertI18nDecl = (node) => {
  node.unshift(
    j.variableDeclaration('const', [
      j.variableDeclarator(
        j.objectPattern([j.objectProperty(j.identifier(I18_FUNC), j.identifier(I18_FUNC))]),
        j.callExpression(j.identifier(I18_HOOK), [])
      )
    ])
  );
};

// 生成函数调用 t(key)
function makeCallExpression(key, value) {
  return j.callExpression(j.identifier(key), [j.stringLiteral(value)]);
}

// 查找顶部function
const findOutFunction = () => {
  let result = null;
  const list = root.find(j.JSXElement);
  function test(path) {
    while (
      path.value &&
      !['ArrowFunctionExpression', 'FunctionDeclaration'].includes(path.value.type)
    ) {
      path = path.parentPath;
    }
    return path;
  }
  list.at(0).forEach((path) => {
    result = test(path);
  });
  return result;
};

if (root.find(j.ImportDeclaration, { source: { value: I18_LIB } }).size() !== 0) return;
insertUser();
insertImport();

insertI18nDecl(j(findOutFunction()).get('body', 'body').value);

root.find(j.Literal).forEach((path) => {
  const { node } = path;
  const i18nKey = findI18nKey(node.value);
  if (i18nKey) {
    if (node.type === 'JSXText') {
      node.value = `{${I18_FUNC}("${i18nKey}")}`;
    } else {
      if (path.parentPath.value.type === 'JSXAttribute') {
        j(path).replaceWith(j.jsxExpressionContainer(makeCallExpression(I18_FUNC, i18nKey)));
      } else {
        j(path).replaceWith(makeCallExpression(I18_FUNC, i18nKey));
      }
    }
  }
});

console.log(root.toSource());
