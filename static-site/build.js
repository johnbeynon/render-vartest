const fs = require('fs');
const path = require('path');

const webserviceId = process.env.WEBSERVICE_ID || '(not set)';

fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });

fs.writeFileSync(
  path.join(__dirname, 'dist', 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Vartest Static Site</title>
</head>
<body>
  <h1>Webservice Service ID</h1>
  <p>${webserviceId}</p>
</body>
</html>
`
);

console.log(`Built with WEBSERVICE_ID=${webserviceId}`);
