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

exports.createTopic = (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    db.run('INSERT INTO TOPICS (title, description, idUser) VALUES (?, ?, 1)', [title, description], function (err) {
        if (err) {
            console.error('Error creating topic:', err);
            res.status(500).send('Error creating topic');
        } else {
            console.log(`New topic added with ID: ${this.lastID}`);
            res.status(201).json({ id: this.lastID, title, description });
        }
    });
};