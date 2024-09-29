const { minify } = require('html-minifier-terser');
const path = require('path');
const fs = require('fs');

const options = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeComments: true,
  removeTagWhitespace: true,
  sortAttributes: true,
  sortClassName: true,
  trimCustomFragments: true,
  useShortDoctype: true,
};

async function minifyHtml(callback) {
  const html = fs.readFileSync(path.join(global.builder.pathBuild, 'index.html'), 'utf-8');

  const result = await minify(html, options);

  fs.writeFileSync(path.join(global.builder.pathBuild, 'index.html'), result);

  console.log('Complete "Minify html"');

  if (callback) {
    callback();
  }
}

module.exports = minifyHtml;
