const express = require('express');
const cors = require('cors');
const app = express();
const port = 4001;

app.use(
  cors({
    origin: '*'
  })
);

app.get('/api/content/:id', (req, res) => {
  res.json({
    _id: req.params.id,
    type: 'article',
    title: 'Another hello world'
  });
});

app.listen(port, () => console.log(`Example API listening on port ${port}!`));
