const express = require('express');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://localhost:3000');
});
