'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');

var proxyTarget = 'http://petstore.swagger.wordnik.com:80/api'; // The location of the backend

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var proxyOptions = url.parse(proxyTarget);
  proxyOptions.route = '/api';

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: [proxy(proxyOptions)],
      routes: {
        '/css': '../main/website/assets/css',
        '/img': '../main/website/assets/img',
        '/content': '../main/website/content'
      }
    },
    browser: browser
  });
}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'app',
	  '../main'
  ], [
    '../main/website/content/*.html',
	  '../main/website/assets/css/*.css',
    '../main/website/assets/img/*',
    'app/scripts/**/*.js',
    'app/partials/**/*.html',
    'app/*.html'
  ]);
});
