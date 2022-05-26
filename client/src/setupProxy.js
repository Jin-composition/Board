const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/post", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};