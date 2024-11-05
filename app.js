const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the updated Blue-Green Deployment App!');
});

app.get('/status', (req, res) => {
  res.send('The app is running smoothly and is up to date!');
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
