const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/api/v1/user', require('./routes/user').router());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`ArticleManager listening on port ${port}`);
});