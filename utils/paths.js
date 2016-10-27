const path = require('path');

const getDestinationPath = function(name, type, suffix) {
  const prefix = path.join('src', type, name);
  const portablePrefix = path.sep === '/' ? prefix : prefix.split(path.sep).join('/');
  return [portablePrefix, suffix].join('.');
};

const getRelativePath = function(name, type, suffix) {
  const filePath = path.join('..', type, name);
  const portableFilePath = path.sep === '/' ? filePath : filePath.split(path.sep).join('/');
  return [portableFilePath, suffix].join('.');
};

const getBaseName = function(path) {
  const items = path.split('/');
  return items[items.length - 1];
};


module.exports = {
  getDestinationPath,
  getBaseName,
  getRelativePath,
}