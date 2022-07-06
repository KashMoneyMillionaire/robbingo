import express, { static as stc } from 'express';

import mongoose from 'mongoose';
const { connect } = mongoose;

import Game from './models/Game.js';
import router from './api/v1/index.js'

import dotenv from 'dotenv'
dotenv.config()

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

var PORT = process.env.PORT || 9000;

// remember url must be encoded
connect(process.env.MONGO_URL);

app.use('/api/v1', router);
app.use(stc('public'));
app.use(function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, init);

function init() {
    console.log('Listening on port ' + PORT);
    Game.findOne({ active: true }, function (err, game) {
        if (!game) {
            console.log('No active game, starting new one');
            game = new Game();
            game.active = true;
        }
    });
}
