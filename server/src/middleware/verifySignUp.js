const { UserModel } = require("../models");

const checkDuplicateMail = async (req, res, next) => {
  console.log("Email reçu dans la requête :", req.body.email); // ajoutez cette ligne
  UserModel.findOne({
    where: {
      mail: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }
    next();

  });
};

module.exports = {
  checkDuplicateMail
};
