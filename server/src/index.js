const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const topicRouter = require('./routes/topics.router');
const runningRouter = require('./routes/running.router');
//const authRouter = require('./routes/auth.router');
const app = express();

app.use(cors());

app.use('/api/topics', topicRouter);
app.use('/api/running', runningRouter);
// app.use('/api/auth', authRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});