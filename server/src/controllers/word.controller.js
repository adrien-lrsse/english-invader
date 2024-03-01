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

  // Vérifier si les données sont au format attendu
  if (!Array.isArray(wordsData)) {
      return res.status(400).json({ message: 'Request body should be an array of word objects' });
  }

  // Vérifier si chaque objet contient les propriétés nécessaires
  for (let word of wordsData) {
      if (!word.wordEn || !word.wordFr || !word.idTopic) {
          return res.status(400).json({ message: 'wordEn, wordFr, and idTopic are required for each word' });
      }
  }

  // Insérer chaque mot dans la base de données
  for (let word of wordsData) {
      const { wordEn, wordFr, idTopic } = word;
      db.run('INSERT INTO WORDS (word_en, word_fr, idTopic) VALUES (?, ?, ?)', [wordEn, wordFr, idTopic], function (err) {
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

