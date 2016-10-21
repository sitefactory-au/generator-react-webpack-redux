'use strict';
const path = require('path');
const walk = require('esprima-walk');

/* For regular JS files */
//const esprima = require('esprima');
//const escodegen = require('escodegen');

/* For files with JSX syntax */
const esprimaFb = require('esprima-fb');
const escodegenJsx = require('escodegen-wallaby');

const read = function(fs, path) {
  const data = fs.read(path);
  const options = {
    sourceType: 'module',
    range: true,
    tokens: true,
    comment: true
  };

  return esprimaFb.parse(data, options);
};

const write = function(fs, path, tree) {
  tree = escodegenJsx.attachComments(tree, tree.comments, tree.tokens);
  const options = { comment: true, format: { indent: { style: '  ' } } };
  const code = escodegenJsx.generate(tree, options) + '\n';
  fs.write(path, code);
};

const getDestinationPath = function(name, type, suffix) {
  const prefix = path.join('src', type, name);
  const portablePrefix = path.sep === '/' ? prefix : prefix.split(path.sep).join('/');
  return [portablePrefix, suffix].join('.');
};

const getRelativePath = function(name, type, suffix) {
  const filePath = path.join('..', type, name);
  const portableFilePath = path.sep === '/' ? filePath : filePath.split(path.sep).join('/');
  return [portableFilePath, suffix].join('.');
};

const getBaseName = function(path) {
  const items = path.split('/');
  return items[items.length - 1];
};

const attachToRootReducer = function(fs, path, relativePath, name) {
  const reducerNode = {
    type: 'Property',
    kind: 'init',
    key: { type: 'Identifier', name: name },
    value: {
      type: 'CallExpression',
      callee: { type: 'Identifier', name: 'require' },
      arguments: [ { type: 'Literal', value: relativePath } ]
    }
  };

  let tree = read(fs, path);
  walk(tree, function(node) {
    if( node.type === 'ExportDeclaration' ) console.log( node);
    if(node.type === 'VariableDeclarator' && node.id.name === 'reducers') {
      node.init.properties.push(reducerNode);
    }
  });
  write(fs, path, tree);
};

module.exports = {
  read,
  write,
  getDestinationPath,
  getBaseName,
  getRelativePath,
  attachToRootReducer
}
