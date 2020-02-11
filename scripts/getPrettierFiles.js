const glob = require('glob');

const getPrettierFiles = () => {
  let files = [];
  const configFiles = glob.sync('config/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const mockFiles = glob.sync('mock/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const jsFiles = glob.sync('src/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const scriptFiles = glob.sync('scripts/**/*.js');
  const tsFiles = glob.sync('src/**/*.ts*', { ignore: ['**/node_modules/**', 'build/**'] });
  const lessFiles = glob.sync('src/**/*.less*', { ignore: ['**/node_modules/**', 'build/**'] });
  files = files.concat(configFiles);
  files = files.concat(mockFiles);
  files = files.concat(jsFiles);
  files = files.concat(scriptFiles);
  files = files.concat(tsFiles);
  files = files.concat(lessFiles);
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;
