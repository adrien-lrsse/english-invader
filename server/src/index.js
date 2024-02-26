// server/index.js

const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db/db.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get('/api/topics', (req, res) => {
  db.all('SELECT * FROM TOPICS', (err, rows) => {
    if (err) {
      console.error('Error getting topics:', err);
      res.status(500).send('Error getting topics');
    } else {
      res.json(rows);
    }
  });
});


const users = [
  { name: 'Ram', email: 'Ram@gmail.com' },
  { name: 'Bob', email: 'bob@gmail.com' }
];

app.get('/api/users', (req, res) => {
  console.log('api/users called!');
  res.json(users);
});



app.get('/api/printSchema', (req, res) => {
  db.serialize(() => {
    // Retrieve the schema using PRAGMA statement
    db.all("PRAGMA table_info('TOPICS')", (err, rows) => {
      if (err) {
        console.error('Error printing schema:', err);
        res.status(500).send('Error printing schema');
      } else {
        if (rows.length === 0) {
          res.status(404).send('Table "TOPICS" does not exist or has no columns.');
        } else {
          // Extract column names from the rows
          const schema = rows.map(row => row.name);
          res.json(schema);
        }
      }
    });
  });
});

  


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
