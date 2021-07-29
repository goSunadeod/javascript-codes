const parse = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

/** 
  import {throttle, cloneDeep} from 'lodash' => import throttle from 'lodash/throttle'
                                                import cloneDeep from 'lodash/cloneDeep'
  lodash-es 代替 或者 lodash-webpack-plugin + babel-plugin-lodash

 */
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

const ast = parse(code, {
  sourceType: 'module'
});

traverse(ast, {
  ImportDeclaration(path) {
    // console.log(path.node)
    let specifiers = path.node.specifiers;
    if (
      path.node.source.value === 'lodash' &&
      !(specifiers.length === 1 && types.isImportDefaultSpecifier(specifiers[0]))
    ) {
      // console.log(specifiers)
      specifiers = specifiers.map((specifier) => {
        let local = types.importDefaultSpecifier(specifier.local);
        if (!types.isImportDefaultSpecifier(specifier)) {
          return types.importDeclaration(
            [local],
            types.stringLiteral('lodash/' + specifier.local.name)
          );
        } else {
          return types.importDeclaration([local], types.stringLiteral('lodash'));
        }
      });
      path.replaceWithMultiple(specifiers);
    }
  }
});

console.log(generate(ast).code);
