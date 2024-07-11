const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,  // This changes the origin of the host header to the target URL
    secure: true         // This option allows the proxying of HTTPS requests without SSL certificate errors
});

proxy.on('error', function (err, req, res) {
  console.error('Proxy error:', err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('An error occurred while proxying the request.');
});

const server = http.createServer(function(req, res) {
    let targetUrl = req.url.substring(1);  // Strip the leading slash

    // Ensure we're getting a valid URL
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        console.log('Received invalid URL:', targetUrl);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request: URL must be HTTP or HTTPS');
        return;
    }

    console.log(`Proxying request to: ${targetUrl}`);

    proxy.web(req, res, { target: targetUrl }, function(e) {
        console.error('Proxy error:', e);
        res.writeHead(502); // Bad Gateway
        res.end('Failed to proxy the request.');
    });
});

proxy.on('proxyRes', function(proxyRes, req, res) {
    console.log(`RAW Response from the target ${req.url}`);
    console.log(`Status: ${proxyRes.statusCode}`);
    console.log(`Headers: ${JSON.stringify(proxyRes.headers)}`);
    proxyRes.pipe(res);
});

console.log("Proxy server running on localhost:5050");
server.listen(5055);
