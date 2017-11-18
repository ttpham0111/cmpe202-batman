const path = require('path');

const express = require('express');


const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});


module.exports = app;
