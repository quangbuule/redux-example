/* eslint-disable no-use-before-define, no-console */
'use strict';

import BrowserSync from 'browser-sync';
import childProcess from 'child_process';
import config from './config';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import nodemon from 'nodemon';
import notifier from 'node-notifier';
import path from 'path';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const $ = gulpLoadPlugins();
const env = process.env.NODE_ENV || 'development';

var isWatching = false;

gulp.task('clean', clean);
gulp.task('js:lint', jsLint);
gulp.task('js:bundle', jsBundle);
gulp.task('browser-sync', browserSyncInitialize);

gulp.task('watch', function () {
  isWatching = true;
  runSequence([ 'js:lint', 'js:bundle', 'browser-sync' ]);
});

gulp.task('nodemon', function () {
  nodemon({
    ignore: [ 'src/js/**', 'node_modules' ],
    exec: 'npm run express',
    verbose: false
  });
});

gulp.task('dev', function (callback) {
  runSequence('js:bundle', [ 'watch', 'nodemon' ], callback);
});

gulp.task('build', function (callback) {
  runSequence('js:bundle', callback);
});

function clean() {
  del('dist');
}

function jsLint() {
  var srcBlob = [ '**/*.@(js|jsx)', '!node_modules/**/*', '!dist/**/*' ];

  return (isWatching ? $.watch(srcBlob) : gulp.src(srcBlob))
    .pipe($.eslint())
    .pipe($.plumber({
      errorHandler(err) {
        if (isWatching) {
          let { fileName, lineNumber, message } = err;
          let relativeFilename = path.relative(process.cwd(), fileName);

          notifier.notify({
            title: 'ESLint Error',
            wait: true,
            message: `Line ${lineNumber}: ${message} (${relativeFilename})`
          }, (err, message) => {
            if (err) {
              console.error(err);
            }

            if (message.startsWith('Activate')) {
              childProcess.exec(`subl --command open_file ${fileName}:${lineNumber}`);
            }
          });
        }
      }
    }))
    .pipe($.eslint.failOnError())
    .pipe($.eslint.formatEach());
}

function jsBundle(callback) {
  const { webpackDevServer: { host, port } } = config;
  var webpackDevServerUrl = `http://${host}:${port}`;
  var babelLoader = {
    test: /\.jsx?$/,
    loaders: [ 'babel-loader' ],
    exclude: [
      path.resolve(__dirname, 'node_modules')
    ]
  };

  var webpackConfig = {
    devtool: '#inline-source-map',
    entry: {
      main: './src/js/main',
      vendor: './src/js/vendor'
    },
    resolve: {
      extensions: [ '', '.jsx', '.js' ],
      modulesDirectories: [ 'node_modules' ]
    },
    target: 'web',
    module: {
      loaders: [ babelLoader ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `"${env}"`
        }
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      publicPath: `${webpackDevServerUrl}/js/`,
      filename: '[name].js',
      chunkFilename: '[id].js'
    }
  };

  var devServerConfig = {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    quiet: true,
    noInfo: true,
    stats: {
      colors: true
    }
  };

  if (env === 'production') {
    webpackConfig.devtool = '#source-map';
    webpackConfig.plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  if (!isWatching) {
    webpack(webpackConfig).run(function (err) {
      if (err) {
        handleError(err);
      }

      if (callback) {
        callback();
      }
    });

  } else {
    webpackConfig.entry.main = [
      `webpack-dev-server/client?${webpackDevServerUrl}`,
      'webpack/hot/only-dev-server',
      webpackConfig.entry.main
    ];

    babelLoader.loaders.unshift('react-hot');
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    );
    var compiler = webpack(webpackConfig);
    var server = new WebpackDevServer(compiler, devServerConfig);

    compiler.plugin('done', (stats) => {
      if (stats.hasErrors()) {
        console.error($.util.colors.red('WebpackError'));
        stats.toJson().errors.forEach(err => console.error(err));
      }

      $.util.log('Finished', $.util.colors.cyan('jsBundle()'));
    });

    server.listen(config.webpackDevServer.port);
  }
}

function browserSyncInitialize() {
  const browserSync = BrowserSync.create();
  browserSync.init({
    files: [ 'dist/**/*' ],
    open: false,
    ui: false,
    logLevel: 'silent',
    port: config.browserSyncServer.port
  });
}

function handleError(err) {
  var { name, message } = err;

  console.error($.util.colors.red(name), message);

  if (isWatching) {
    notifier.notify({
      title: 'Build Error',
      message: 'Something went wrong.'
    });
  }
}
