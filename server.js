let http = require('http');
let fs = require('fs');

http.createServer(function(req, res) {
  // console.log('test2');
  /*res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('hello world');
  res.end(); */
  if (req.url === '/') {
    fs.readFile('./index.html', function(err, html) {
      if (err) {
        throw err;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(html);
      console.log('html output');
      res.end();
    });
  } else if (req.url === '/stylesheet.css') {
    fs.readFile('./stylesheet.css', function(err, css) {
      if (err) {
        throw err;
      }

      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(css);
      res.end();
    });
  } else if (req.url === '/index.js') {
    fs.readFile('./index.js', function(err, js) {
      if (err) {
        throw err;
      }

      res.writeHead(200, { 'Content-Type': 'text/js' });
      res.write(js);
      res.end();
    });
  } else if (req.url === '/background.jpg') {
    fs.readFile('./background.jpg', function(err, js) {
      if (err) {
        throw err;
      }

      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      res.write(js);
      res.end();
    });
  } else if (req.url === '/chat.png') {
    fs.readFile('./chat.png', function(err, js) {
      if (err) {
        throw err;
      }

      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.write(js);
      res.end();
    });
  }
  // console.log('test3');
}).listen(8080);
console.log('Server running on port 8080');
