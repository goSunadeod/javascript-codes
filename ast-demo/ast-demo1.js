const jf = require("jscodeshift");

const code = `
import React from 'react'
import {throttle, cloneDeep} from 'lodash'
// import _ from 'lodash'
// import _, {throttle, cloneDeep} from 'lodash'
import {mmNB} from 'mmApi'
`


const root = jf(code);
root
  .find(jf.ImportDeclaration, { source: { value: 'lodash' } })
  .forEach((path) => {
    console.log(path.node)
    const { specifiers } = path.node;
    specifiers.forEach((spec) => {
     
    });
  });

console.log(root.toSource());