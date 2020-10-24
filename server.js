const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.listen(8081, '0.0.0.0', () => {
  console.log('Server listening on http://0.0.0.0:8081');
});
