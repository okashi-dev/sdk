// Safari 16.2
// `import l:0 must be an object`
// `import function l:0 must be callable`

// Chrome 109.0.5414.87
// `WebAssembly.instantiate(): Import #0 module="l" error: module is not an object or function`
// `WebAssembly.instantiate(): Import #0 module="l" function="0" error: function import requires a callable`

import {browser} from '../utilities/browser.js';

const expressions = {
  safari: {
    moduleError: /import (?<module>\w+):(?<fn>\w+) (?<message>.*)/,
    functionError: /import function (?<module>\w+):(?<fn>\w+) (?<message>.*)/
  },
  chrome: {
    moduleError: /Import \#(\d+) module=\"(?<module>\w+)\" error: (.*)/,
    functionError: /Import \#(\d+) module=\"(?<module>\w+)\" function=\"(?<fn>\w+)\" error: (.*)/
  }
};

function parseAssemblyImportObject(binary, callback, importObject = {}) {
  // console.log(browser.name);
  WebAssembly.instantiate(binary, importObject)
    .then((value) => {
      callback(value);
    })
    .catch(async (reason) => {
      // console.log(reason.message);

      const moduleError = expressions[browser.name].moduleError.exec(reason.message);
      // console.log(moduleError?.groups);
      if (moduleError?.groups?.module) {
        importObject[moduleError.groups.module] = {};
        return parseAssemblyImportObject(binary, callback, importObject);
      }

      const functionError = expressions[browser.name].functionError.exec(reason.message);
      // console.log(functionError?.groups);
      if (functionError?.groups?.fn) {
        importObject[functionError.groups.module][functionError.groups.fn] = () => {};
        return parseAssemblyImportObject(binary, callback, importObject);
      }
    });
}
function parseAssembly(binary) {
  return new Promise((resolve, reject) => {
    parseAssemblyImportObject(binary, resolve);
  });
}

export {parseAssembly};