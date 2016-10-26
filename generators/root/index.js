'use strict';
let generator = require('yeoman-generator');
let prompts = require('./prompts');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },
  
  writing: function() {
    /* Some base functionality needs to be overwritten, so we force yeoman to do
     * so. This is not the nicest thing to do, but since this changes are needed
     * it does not make sense to give the user a choice.
     */
    this.conflicter.force = true;

    // Copy the store
    // this.fs.copy(
    //   this.templatePath('store.js'),
    //   this.destinationPath('src/stores/index.js')
    // );

    // Copy the root reducer
    // this.fs.copy(
    //   this.templatePath('reducer.js'),
    //   this.destinationPath('src/reducers/index.js')
    // );
	
	// // Copy the root epic
  //   this.fs.copy(
  //     this.templatePath('epics.js'),
  //     this.destinationPath('src/app/epics.js')
  //   );

    // Copy the actions const template
    // this.fs.copy(
    //   this.templatePath('const.js'),
    //   this.destinationPath('src/actions/const.js')
    // );

    // Copy the entry point over the original entry point
    // this.fs.copy(
    //   this.templatePath('index.js'),
    //   this.destinationPath('src/index.js')
    // );

    // Copy the DevTools utils
    // this.fs.copy(
    //   this.templatePath('DevTools.js'),
    //   this.destinationPath('src/utils/DevTools.js')
    // );

    // Copy the router service
    // this.fs.copy(
    //   this.templatePath('router.js'),
    //   this.destinationPath('src/services/router/index.js')
    // );

    // this.composeWith('sf-redux:component', {
    //   args: ['HelloWorld']
    // });
    
    // this.composeWith('sf-redux:page', {
    //   args: ['Home']
    // });

    // if( this.createApi ){
    //   this.composeWith('sf-redux:api', {
    //     args: ['api']
    //   });
    // }
  }
});
