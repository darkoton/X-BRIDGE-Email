const path = require('path');

function server(callback) {
  global.builder.plugins.server.init({
    server: {
      baseDir: path.join(path.resolve(), 'dist'),
    },
    notify: false,
    port: 3000,
  });

  if (callback) {
    callback();
  }
}

module.exports = server;
