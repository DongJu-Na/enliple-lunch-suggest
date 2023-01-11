const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://hooks.hiworks.com/messenger/chat/55ed0406b390ff42e76333428dfc2db6',
      changeOrigin: true,
    })
  );
};