'use strict';

var express = require('express');
var mongoose = require('mongoose');

var Game = require('./models/Game.js');

var app = express();

var PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL);

app.use('/api/v1', require('./api/v1'));
app.use(express.static('public'));
app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, init);

function init() {
    console.log('Listening on port ' + PORT);
    Game.findOne({ active: true }, function(err, game) {
        if (!game) {
            console.log('No active game, starting new one');
            game = new Game();
            game.active = true;
        }
    });
}
