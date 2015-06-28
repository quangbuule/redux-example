'use strict';

export default {
  /**
   * Front-End Server
   */
  server: {
    host: 'localhost',
    port: 8080
  },

  /**
   * API Server
   */
  apiServer: {
    urlPrefix: 'https://api.github.com'
  },

  /**
   * WebpackDevServer
   */
  webpackDevServer: {
    host: 'localhost',
    port: 8081
  },

  /**
   * browserSync
   */
  browserSyncServer: {
    host: 'localhost',
    port: 8082
  }
};
