const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    autoRewrite: true,
    cookieDomainRewrite: '',
    cookiePathRewrite: '/'
});

module.exports = async function (req, res) {
    // Set the target URL (YouTube in this case)
    const targetUrl = 'https://www.youtube.com';

    // Handle proxy errors
    proxy.on('error', (err, req, res) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong.');
    });

    // Proxy the request
    proxy.web(req, res, { target: targetUrl });
};
