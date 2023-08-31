const express = require('express');
const pgp = require('pg-promise')();

const app = express();
const port = 3000;

const db = pgp({
  host: 'your_db_host',
  port: 'your_db_port',
  database: 'your_db_name',
  user: 'your_db_user',
  password: 'your_db_password'
});

app.set('view engine', 'ejs'); // Use EJS for rendering templates

app.get('/', async (req, res) => {
  try {
    const fillableObjects = await db.any('SELECT * FROM fillable_objects');
    res.render('index', { fillableObjects });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
