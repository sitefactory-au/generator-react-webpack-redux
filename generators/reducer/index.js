'use strict';
let generator = require('yeoman-generator');
let path = require('path');
let walk = require('esprima-walk');
let utils = require('../../utils/all');

module.exports = generator.Base.extend({
  constructor: function () {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function () {
    const appPath = this.destinationPath('src/containers/App.js');
    const rootReducerPath = this.destinationPath('src/reducers/index.js');
    const destination = utils.paths.getDestinationPath(this.name, 'reducers', 'js');
    const baseName = utils.paths.getBaseName(this.name);
    const testDestinationPath = path.join('test', 'reducers', baseName + 'Test.js');
    const relativePath = utils.paths.getRelativePath(this.name, 'reducers', 'js');

    // Copy the reducer template
    this.fs.copy(
      this.templatePath('reducer.js'),
      this.destinationPath(destination)
    );

    // Copy the reducers unit test
    this.fs.copyTpl(
      this.templatePath('Test.js'),
      this.destinationPath(testDestinationPath),
      { reducerName: baseName }
    );

    // Add the reducer to the root reducer
    utils.attach.toRootReducer(this.fs, rootReducerPath, relativePath, baseName);

    // Add the reducer to App.js
    //this.attachToApp(appPath, baseName);
  },

  install: function () {
    this.conflicter.force = true;
    utils.attach.commit();
  }
});
