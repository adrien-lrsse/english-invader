// word.controller.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to database');
      }
});

exports.createWord = (req, res) => {
  const wordsData = req.body;

  if (!Array.isArray(wordsData)) {
      return res.status(400).json({ message: 'Request body should be an array of word objects' });
  }

  for (let word of wordsData) {
      if (!word.word_en || !word.word_fr || !word.idTopic) {
          return res.status(400).json({ message: 'word_en, word_fr, and idTopic are required for each word' });
      }
  }

  for (let word of wordsData) {
      const { word_en, word_fr, idTopic } = word;
      db.run('INSERT INTO WORDS (word_en, word_fr, idTopic) VALUES (?, ?, ?)', [word_en, word_fr, idTopic], function (err) {
          if (err) {
              console.error('Error creating word:', err);
              res.status(500).send('Error creating word');
          } else {
              console.log(`New word added with ID: ${this.lastID}`);
          }
      });
  }

  res.status(201).json({ message: 'Words added successfully' });
};

