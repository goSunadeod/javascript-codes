const j = require('jscodeshift');

const code = `
import React from 'react'
import _ from 'lodash'
// import _, {throttle, cloneDeep} from 'lodash'
// import {throttle, cloneDeep} from 'lodash'
import {mmNB} from 'mm-api'

/**
 * MMNB
 * MMDDDD PLZ
 */

`;

const root = j(code);
const test = root.find(j.ImportDeclaration, { source: { value: 'lodash' } });
console.log(test.length);
if (!test.length) return;
let lodashImportDeclaration;
test.forEach((path) => {
  const { specifiers } = path.node;
  lodashImportDeclaration = specifiers.map((specifier) => {
    const name = specifier.local.name;
    return j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(name))],
      j.literal(specifier.type === 'ImportSpecifier' ? 'lodash/' + name : 'lodash')
    );
  });
});
if (!lodashImportDeclaration) return;
test.replaceWith(() => lodashImportDeclaration);
console.log(root.toSource());
