const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));

app.get('/', function(req, res) {
    var options = {
        root: __dirname + '/public/'
    };
    var fileName = 'index.html';
    res.type('.html');
    res.sendFile(fileName, options, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

app.get('/teamslist', function(req, res) {
    var files = fs.readdirSync('./public/json');
    res.send({
        files
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})