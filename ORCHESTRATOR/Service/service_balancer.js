const http = require("http");
const httpProxy = require("http-proxy");

function process_balancer(SEVERS = []) {
  const proxy = httpProxy.createProxyServer({});
  const server = http.createServer((req, res) => {
    const target = SEVERS[Math.floor(Math.random() * SEVERS.length)];

    if (!target.ip) {
      proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
    } else {
      proxy.web(req, res, { target: `${target.host}:${target.port}` });
    }
  });

  return server;
}

module.exports = process_balancer;
