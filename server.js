const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    
    const logMessage = `${new Date().toISOString()} - Requested URL: ${request.url}\n`;
    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) {
            console.error('Error logging request:', err);
        }
    });

    if (parsedUrl.pathname === '/documentation.html') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Documentation on the bookclub API.\n');
    }
    else if (parsedUrl.pathname === '/documentation') {
        fs.readFile('documentation.html', (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end('Error loading documentation file.');
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } 
    else {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end('Error loading index file.');
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    }
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080...');
});