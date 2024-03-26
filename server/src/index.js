const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const topicRouter = require('./routes/topics.router');
const runningRouter = require('./routes/running.router');
const wordRouter = require('./routes/word.router');
const organizationRouter = require('./routes/organization.router');
const db = require('./models');
const authRouter = require('./routes/auth.router');
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/topics', topicRouter);
app.use('/api/words', wordRouter);
app.use('/api/running', runningRouter);
app.use('/api/auth', authRouter);
app.use('/api/organizations', organizationRouter);
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
