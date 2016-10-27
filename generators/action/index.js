'use strict';
let generator = require('yeoman-generator');
let paths = require('../../utils/paths');


module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function() {
    const appPath = this.destinationPath('src/containers/App.js');
    const destination = utils.getDestinationPath(this.name, 'actions', 'js');
    const constPath = this.destinationPath('src/actions/const.js');
    const baseName = utils.getBaseName(this.name);
    const constantName = (baseName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    const relativePath = utils.getRelativePath(this.name, 'actions', 'js');
    const depth = this.name.split('/').length - 1;
    const importPath = ['../'.repeat(depth), 'const'].join('');

    // Copy action template
    this.fs.copyTpl(
      this.templatePath('Action.js'),
      this.destinationPath(destination),
      {
        actionConstant: constantName,
        importPath: importPath
      }
    );

    // Add action to const.js
    attach.toConstants(this.fs, constPath, constantName);

    // Add action to App.js
    //this.attachToApp(appPath, relativePath, baseName);
  }
});
