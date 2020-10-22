const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});
