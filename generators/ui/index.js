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

    var filesToCopy = [
      'index.js',
      'styles.js',
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
  }
});
