const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
