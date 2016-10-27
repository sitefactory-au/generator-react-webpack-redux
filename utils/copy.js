let path = require('path');

const tpl = function( location, baseName ){
    var args = { 
      name: baseName
    };

    this.log( 'Scaffolding ' + baseName + ' to ' + location);
    var srcPath = path.join( this.sourceRoot(), '/**/*');
    var destPath = path.join( this.destinationRoot(), location + '/' + baseName );    
    this.fs.copyTpl(srcPath, destPath, args);
};

module.exports = { tpl }