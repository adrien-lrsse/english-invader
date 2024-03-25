const { UserModel } = require('../models');
const config = require('../config/auth.config');


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    UserModel.create({
        mail: req.body.email,
        pseudo: req.body.pseudo,
        password: bcrypt.hashSync(req.body.password, 8)
    }). then(user => {
        res.status(200).json({ message: "User registered successfully!" });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.signin = async (req, res) => {
    console.log("Email reçu dans la requête :", req.body.mail);
    UserModel.findOne({
      where: {
        mail: req.body.mail
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid){
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
  
      const token = jwt.sign({id: user.idUser},
        config.secret,
        {
          algorithm: 'HS256',
          expiresIn: 86400
        });
  
      res.status(200).send({
        id: user.idUser,
        username: user.username,
        email: user.email,
        pseudo: user.pseudo,
        accessToken: token,
        message: "User connected successfully!"
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  };


  exports.getUser = async (req, res) => {
    console.log("req.userId", req.userId);

    UserModel.findOne({
      where: {
        idUser: req.userId
      }

    }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      res.status(200).send({
        id: user.idUser,
        pseudo: user.pseudo,
        email: user.email,
        accessToken: req.headers.authorization,
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  }