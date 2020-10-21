const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.get('/js/game.js', function(req,res){
    res.sendFile(path.join(__dirname + '/js/game.js')); 
});

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});
