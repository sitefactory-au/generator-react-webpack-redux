'use strict';

//const config = require('./config');
const yeoman = require('./yeoman');
const attach = require('./attach');
const paths = require('./paths');
const copy = require('./copy');

module.exports = {
//  config,
  yeoman,
  paths,
  attach,
  copy
};
