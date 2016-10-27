'use strict';
let generator = require('yeoman-generator');
let paths = require('../../utils/paths');


module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function () {
    const baseName = paths.getBaseName(this.name);
    const depth = this.name.split('/').length - 1;
    const prefix = '../'.repeat(depth);

    var args = {
      name: baseName,
      prefix: prefix
    };

    // Copy the template files
    this.log('Scaffolding ' + this.name + ' api');

    var destPath = 'src/services/' + baseName + '/index.js';
    if (!this.fs.exists(destPath)) {
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath(destPath),
        args
      );
    }
  }
});
