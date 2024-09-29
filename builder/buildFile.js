const path = require('path');
const browserSync = require('browser-sync').create('My Server');
const config = require(path.join(path.resolve(), 'builder', 'builder.config.json'));
const defaultConfig = require(path.join(path.resolve(), 'builder', 'data', 'config.default.json'));
const args = process.argv.slice(2);
const mode = args[0];

global.builder = {
  pathSourse: path.join(__dirname, '../', 'src'),
  pathBuild: path.join(__dirname, '../', 'dist'),
  plugins: {
    server: browserSync,
  },
  config: name => {
    if (config[name]) {
      return config[name];
    } else {
      return defaultConfig[name];
    }
  },
};

const inlineCss = require('./modules/inline-css');
const server = require('./modules/server');
const minify = require('./modules/minify');
const uploadFile = require('./modules/upload-file');
const pathToUrl = require('./modules/path-to-url');

function watcher() {
  inlineCss(uploadFile.bind(this, pathToUrl));
}

if (mode === 'dev') {
  inlineCss(uploadFile.bind(this, pathToUrl.bind(this, server)));
  browserSync.watch(path.join(global.builder.pathSourse, '*.*')).on('change', watcher);
}

if (mode === 'build') {
  inlineCss(uploadFile.bind(this, pathToUrl.bind(this, minify)));
}
