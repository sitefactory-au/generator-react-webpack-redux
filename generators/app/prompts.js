'use strict';
const utils = require('../../utils/all');

module.exports = [
  {
    type: 'input',
    name: 'appName',
    message: 'Please choose your application name',
    default: utils.yeoman.getAppName()
  },
  {
    type: 'confirm',
    name: 'createApi',
    message: 'Add ajax API?',
    default: true
  }
];
