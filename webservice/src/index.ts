import http from 'http';

const port = process.env.PORT || 3000;

const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
