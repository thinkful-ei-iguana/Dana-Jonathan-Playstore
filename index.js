const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const gapps = require('./playstore.js');

app.listen(8080, () => {
  console.log('server Started on Port 8080');
});

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  let results = gapps;
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

  if (sort) {
    if (!['rating', 'app'].includes(sort.toLowerCase())) {
      return res.status(400).send('sort value must either be rating or app');
    }
  }else {
    sort = sort.toLowerCase();
    if (sort === 'rating') {
      sort = parseFloat(sort);
    }
   
      results.sort((a, b) => {
      return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 0;
   });

  }

  res.json(results);
});
