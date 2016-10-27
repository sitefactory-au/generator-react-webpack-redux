'use strict';
let generator = require('yeoman-generator');
let paths = require('../../utils/paths');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function() {
    const destination = paths.getDestinationPath(this.name, 'containers', 'js');
    const baseName = paths.getBaseName(this.name);
    const depth = this.name.split('/').length - 1;
    const prefix = '../'.repeat(depth);

    // Copy container template
    this.fs.copyTpl(
      this.templatePath('Container.js'),
      this.destinationPath(destination),
      {
        name: baseName,
        prefix: prefix
      }
    );
  }
});
