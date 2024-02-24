// server/index.js

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


const users = [
  { name: 'Ram', email: 'Ram@gmail.com' },
  { name: 'Bob', email: 'bob@gmail.com' }
];

app.get('/api/users', (req, res) => {
  console.log('api/users called!');
  res.json(users);
});
  


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
