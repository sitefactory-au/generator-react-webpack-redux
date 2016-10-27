'use strict';
let generator = require('yeoman-generator');
let utils = require('../../utils/all');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function() {
    const baseName = utils.paths.getBaseName(this.name);
    const depth = this.name.split('/').length - 1;
    const prefix = '../'.repeat(depth);
    const rootReducerPath = this.destinationPath('src/reducers/index.js');
    const relativePath = utils.paths.getRelativePath('reducer', 'modules/' + this.name, 'js');
    
    utils.copy.tpl.call( this, 'src/modules', baseName);

    // Add the reducer to the root reducer
    utils.attach.toRootReducer(this.fs, rootReducerPath, relativePath, baseName);
  }
});
