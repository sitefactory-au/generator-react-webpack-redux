'use strict';
let generator = require('yeoman-generator');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);

    this.option('skip-install');
  },
  
  initializing : function () {
//    Run the base react-webpack generator, then run the dispatcher
    this.composeWith(
      'react-webpack',
      {
        options: {
          'skip-install': true
        }
      },
      {
        local: require.resolve('generator-react-webpack'),
        link: 'strong'
      }
    );

    //Run the create root method
    this.composeWith('sf-redux:root', {
      args: ['Root']
    },
    {
      link: 'strong'
    });

    this.conflicter.force = true;
  },

  install: function() {
    if(!this.options['skip-install']) {
      this.installDependencies({ bower: false });
      
      // Install redux and react bindings as requirement
      var npmPackages = [
          'redux', 
          'react-redux', 
          'redux-devtools', 
          'redux-devtools-log-monitor', 
          'redux-devtools-dock-monitor', 
          'react-router', 
          'react-router-redux', 
          'reselect', 
          'lodash', 
          'material-ui',
          'react-tap-event-plugin', 
          'redux-observable', 
          'rxjs',
          'fela',
          'react-fela'];
      this.npmInstall(npmPackages, { save: true });
    }
  },
});
