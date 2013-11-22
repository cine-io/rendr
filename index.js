if (!this.window) {
  var Server = require('./server/server')

  exports.createServer = function(options) {
    return new Server(options);
  };
}
