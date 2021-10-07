const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend was init.');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8000!.');
});
