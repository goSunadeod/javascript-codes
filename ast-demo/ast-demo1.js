const jf = require('jscodeshift');

const code = `
import React from 'react'
// import {throttle, cloneDeep} from 'lodash'
// import _ from 'lodash'
import _, {throttle, cloneDeep} from 'lodash'
import {mmNB} from 'mmApi'
`;

const root = jf(code);
const test = root.find(jf.ImportDeclaration, { source: { value: 'lodash' } });
if (!test.length) return;
let lodashImportDeclaration;
test.forEach((path) => {
  const { specifiers } = path.node;
  lodashImportDeclaration = specifiers.map((specifier) => {
    const name = specifier.local.name;
    return jf.importDeclaration(
      [jf.importDefaultSpecifier(jf.identifier(name))],
      jf.literal(specifier.type === 'ImportSpecifier' ? 'lodash/' + name : 'lodash')
    );
  });
});
if (!lodashImportDeclaration) return;
test.replaceWith(() => lodashImportDeclaration);
console.log(root.toSource());
