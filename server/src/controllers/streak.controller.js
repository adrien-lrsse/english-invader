const { StreakModel } = require('../models/index');

function julianDate(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
  }
  

exports.getStreak = async (req, res) => {
  try {
    const streak = await StreakModel.findOne({
      where: {
        idUser: req.userId
      }
    });
    res.json(streak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateStreak = async (req, res) => {
  try {
    const streak = await StreakModel.findOne({
      where: {
        idUser: req.userId
      }
    });
    if (!streak) {
      return res.status(404).json({ message: 'Streak not found' });
    }
    const today = new Date();
    const julian = julianDate(today);
    if ((julian - streak.date) >= 1 && (julian - streak.date) < 2) {
      await streak.update({
        date: julian,
        streak: streak.streak + 1
      });
      res.status(200).json({ message: "Streak updated successfully!" });
    } else if (streak.streak === 0) {
      await streak.update({
        date: julian,
        streak: 1
      });
      res.status(200).json({ message: "Streak reset" });
    }
    else if ((julian - streak.date) >= 2){
      await streak.update({
        date: julian,
        streak: 1
      });
      res.status(200).json({ message: "Streak updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.createStreak = async (idUser) => {
    try {
      const date = new Date();
      const julian = julianDate(date);
      const streak = await StreakModel.create({
        idUser: idUser,
        date: julian,
        streak: 0
      });
    } catch (error) {
    }
  }
  