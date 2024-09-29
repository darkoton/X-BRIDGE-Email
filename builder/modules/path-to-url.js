const path = require('path');
const fs = require('fs');
const db = require(path.join(path.resolve(), 'builder', 'data', 'files.json'));

async function pathToUrl(callback) {
  let html = fs.readFileSync(path.join(global.builder.pathBuild, 'index.html'), 'utf-8');

  const promises = db.map(file => {
    return new Promise((resolve, reject) => {
      const escapedFileName = file.name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const re = new RegExp(escapedFileName, 'g');
      html = html.replace(re, file[global.builder.config('image')]);

      resolve();
    });
  });

  await Promise.all(promises);

  fs.writeFileSync(path.join(global.builder.pathBuild, 'index.html'), html);

  global.builder.plugins.server.reload();

  console.log('Complete "Path to Url"');

  if (callback) {
    callback();
  }
}

module.exports = pathToUrl;
