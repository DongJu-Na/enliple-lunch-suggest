const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/hiworks',
    createProxyMiddleware({
      target: 'https://hooks.hiworks.com',
      changeOrigin: true,
       pathRewrite: {
        '^/hiworks': '' // URL ^/api -> 공백 변경
        }
    })
  );

  app.use(
    '/slack',
    createProxyMiddleware({
      target: 'https://hooks.slack.com',
      changeOrigin: true,
       pathRewrite: {
        '^/slack': '' // URL ^/api -> 공백 변경
        }
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://my-json-server.typicode.com',
      changeOrigin: true,
       pathRewrite: {
        '^/api': '' // URL ^/api -> 공백 변경
        }
    })
  );
};