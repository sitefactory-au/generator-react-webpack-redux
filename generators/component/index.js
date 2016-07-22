'use strict';
let generator = require('yeoman-generator');
let utils = require('../app/utils');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function() {
    const baseName = utils.getBaseName(this.name);
    const depth = this.name.split('/').length - 1;
    const prefix = '../'.repeat(depth);
    const rootReducerPath = this.destinationPath('src/reducers/index.js');
    const relativePath = utils.getRelativePath('reducer', 'components/' + this.name, 'js');

    var filesToCopy = [
      'container.js',
      'actionTypes.js',
      'actions.js',
      'ui.js',
      'constants.js',
      'index.js',
      'selectors.js',
      'reducer.js'
    ];

    var args = { 
      name: baseName,
      prefix: prefix
    };
    
    // Copy the template files
    filesToCopy.forEach( (file) => {
      var destPath = 'src/components/' + baseName + '/' + file;
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(destPath),
        args
      );
    })

    this.conflicter.force = true;
    // Add the reducer to the root reducer
    utils.attachToRootReducer(this.fs, rootReducerPath, relativePath, baseName);
  }
});
