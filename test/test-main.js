var allTestFiles = []
var TEST_REGEXP = /(test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    console.log(normalizedTestModule);
    allTestFiles.push(normalizedTestModule)
  }
})

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/',
  // baseUrl: '',

  shim: {
      underscore: {
          exports: '_'
      },
      backbone: {
          deps: [
              'underscore', 'jquery'
          ],
          exports: 'Backbone'
      }
  },

  paths: {
      jquery: 'node_modules/jquery/dist/jquery.min',
      underscore: 'node_modules/underscore/underscore-min',
      backbone: 'node_modules/backbone/backbone-min',
      d3: 'node_modules/d3/build/d3.min',
      bluebird: 'node_modules/bluebird/js/browser/bluebird.min'
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
