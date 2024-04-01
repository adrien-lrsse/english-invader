const { GameModel } = require('../models/index');

exports.getHighScores = async (req, res) => {
  try {
    const idTopic = req.params.idTopic;
    const highScores = await GameModel.find({ idTopic: idTopic }).sort({ score: -1 }).limit(10);
    res.status(200).json(highScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addHighScore = async (req, res) => {
  try {
    const newHighScore = new GameModel(req.body);
    const savedHighScore = await newHighScore.save();
    res.status(201).json(savedHighScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHighScoreByUserAndTopic = async (req, res) => {
  try {
    console.log(req.params.idTopic, req.userId)
    const idTopic = req.params.idTopic;
    const userId = req.userId;
    const highScore = await GameModel.findOne({ 
      where : { 
        idTopic: idTopic, 
        idUser: userId 
      }

    });
    res.status(200).json(highScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserHighscore = async (req, res) => {
    try {
      const idTopic = req.params.idTopic;
      const userId = req.userId;
      const score = req.body.score;
  
      const highScore = await GameModel.findOne({
        where: {
          idTopic: idTopic,
          idUser: userId
        }
      });
  
      if (!highScore) {
        // Créer un nouvel enregistrement si aucun enregistrement existant n'est trouvé
        const newHighScore = await GameModel.create({
          idTopic: idTopic,
          idUser: userId,
          score: score
        });
        res.status(201).json(newHighScore);
      } else {
        // Mettre à jour l'enregistrement existant
        if (score > highScore.score) {
          await highScore.update({
            score: score
          });
          res.status(200).json({ message: "High score updated successfully!", score: score});
        } else {
          res.status(200).json({ message: "High score not updated" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  