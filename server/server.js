const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const todos = require('./routes/todos.router.js');

let PORT = process.env.PORT || 3000;

// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(cors());
app.use(express.static('./server/public'));
app.use(express.json());

app.use('/todos', todos);

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
