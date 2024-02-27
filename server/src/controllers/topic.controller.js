// topic.controller.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to database');
      }
});

exports.getAllTopics = (req, res) => {
    db.all('SELECT * FROM TOPICS', (err, rows) => {
        if (err) {
            console.error('Error getting topics:', err);
            res.status(500).send('Error getting topics');
        } else {
            res.json(rows);
        }
    });
}

