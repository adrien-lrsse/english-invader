const { UserModel, TopicModel } = require("../models");
exports.getStatus = (req, res) => {
    res.json({ message: "Hello from server!" });
}


exports.getAllUsers = async (req, res) => {
  try {
    const users = await TopicModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
