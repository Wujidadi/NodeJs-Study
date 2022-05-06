const http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Here comes a server!');
}).listen(60888);

console.log('Server running at http://127.0.0.1:60888/');
