module.exports = function(config) {
  var detectBrowsers = {
    enabled: false,
    usePhantomJS: false
  };

  config.set({
    basePath: '..',
    frameworks: ['qunit'],
    files: [
      'node_modules/video.js/dist/video-js.css',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/video.js/dist/video.js',
      'test/dist/bundle.js'
    ],
    customLaunchers: {
      travisChrome: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['Firefox', 'travisChrome'],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  });
};
