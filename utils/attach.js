'use strict';
const walk = require('esprima-walk');
/* For regular JS files */
//const esprima = require('esprima');
//const escodegen = require('escodegen');

/* For files with JSX syntax */
const esprimaFb = require('esprima-fb');
const escodegenJsx = require('escodegen-wallaby');

const read = function (fs, path) {
  const data = fs.read(path);
  const options = {
    sourceType: 'module',
    range: true,
    tokens: true,
    comment: true
  };

  return esprimaFb.parse(data, options);
};

const write = function (fs, path, tree) {
  tree = escodegenJsx.attachComments(tree, tree.comments, tree.tokens);
  const options = { comment: true, format: { indent: { style: '  ' } } };
  const code = escodegenJsx.generate(tree, options) + '\n';
  fs.write(path, code);
};

var attachments = [];

const toRootReducer = function (fs, path, relativePath, name) {
  attachments.push({ target: attachToRootReducerActual, args: arguments });
}

const toConstants = function (path, name) {
  attachments.push({ target: attachToConstantsActual, args: arguments });
}

const toApp = function (path, actionPath, name) {
  attachments.push({ target: attachToAppActual, args: arguments });
}

const commit = function () {
  while( attachments.length ) {    
    var a = attachments.pop();
    a.target.apply(this, a.args);
  }
}

const attachToAppActual = function (path, actionPath, name) {
  console.log('Attaching ' + name + " to app.");
  const actionNode = {
    type: 'Property',
    kind: 'init',
    key: { type: 'Identifier', name: name },
    value: {
      type: 'CallExpression',
      callee: { type: 'Identifier', name: 'require' },
      arguments: [{ type: 'Literal', value: actionPath }]
    }
  };

  let tree = read(fs, path);
  walk(tree, function (node) {
    if (node.type === 'VariableDeclarator' && node.id.name === 'actions') {
      node.init.properties.push(actionNode);
    }
  });

  write(fs, path, tree);
};

const attachToConstantsActual = function (fs, path, name) {
  console.log('Attaching ' + name + " to constants.");
  const constantNode = {
    type: 'ExportDeclaration',
    declaration: {
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: name
          },
          init: {
            type: 'Literal',
            value: name
          }
        }
      ]
    }
  };

  let tree = read(fs, path);
  walk(tree, function (node) {
    if (node.type === 'Program') {
      node.body.push(constantNode);
    }
  });

  write(fs, path, tree);
};

const attachToRootReducerActual = function (fs, path, relativePath, name) {
  console.log('Attaching ' + name + " to root reducer.");
  const reducerNode = {
    type: 'Property',
    kind: 'init',
    key: { type: 'Identifier', name: name },
    value: {
      type: 'CallExpression',
      callee: { type: 'Identifier', name: 'require' },
      arguments: [{ type: 'Literal', value: relativePath }]
    }
  };

  let tree = read(fs, path);
  walk(tree, function (node) {
    if (node.type === 'ExportDeclaration') console.log(node);
    if (node.type === 'VariableDeclarator' && node.id.name === 'reducers') {
      node.init.properties.push(reducerNode);
    }
  });
  write(fs, path, tree);
};

module.exports = {
  read,
  write,
  toRootReducer,
  commit
}


/** removed from reducer index.js -- might be useful example code 

 this.attachToApp = function(path, name) {
      const stateNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name: name },
        value: {
          type: 'MemberExpression',
          object: { type: 'Identifier', name: 'state' },
          property: { type: 'Identifier', name: name }
        }
      };

      let tree = utils.read(this.fs, path);
      walk(tree, function(node) {
        // Map reducer to state props
        if(node.type === 'VariableDeclarator' && node.id.name === 'props') {
          node.init.properties.push(stateNode);
        }

        // Add state to main container
        if(node.type === 'MethodDefinition' && node.key.name === 'render') {
          const diff = {
            value: {
              type: 'Identifier',
              name: name,
              typeAnnotation: undefined,
              optional: undefined
            },
            shorthand: true
          }
          const propNode = Object.assign({}, stateNode, diff);
          node.value.body.body[0].declarations[0].id.properties.push(propNode);
        }

        if(node.type === 'MethodDefinition' && node.key.name === 'render') {
          const attribute = {
            type: 'JSXAttribute',
            name: { type: 'JSXIdentifier', name: name},
            value: {
              type: 'JSXExpressionContainer',
              expression: {
                type: 'Identifier',
                name: name
              }
            }
          }
          node.value.body.body[1].argument.openingElement.attributes.push(attribute);
        }

        // Make the reducers state required
        if(node.type === 'AssignmentExpression' && node.left.object.name === 'App') {
          const diff = {
            value: {
              type: 'MemberExpression',
              object: { type: 'Identifier', name: 'PropTypes' },
              property: { type: 'Identifier', name: 'object.isRequired' }
            }
          }
          const propNode = Object.assign({}, stateNode, diff);
          node.right.properties.push(propNode);
        }
      });

      utils.write(this.fs, path, tree);
    };

    */