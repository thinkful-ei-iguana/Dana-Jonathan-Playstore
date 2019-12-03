const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const gapps = require('./playstore.js');

app.listen(8000, () => {
  console.log('server Started on Port 8000');
});

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).send('sort value must either be rating or app');
    }
  }
  if (genres) {
    if (
      !['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(
        genres
      )
    ) {
      return res.status(400).send(
        // eslint-disable-next-line quotes
        "genres value must either be 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'"
      );
    }
  }

  res.json(gapps);
});
