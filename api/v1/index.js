import { Router } from 'express';
import bodyparser from 'body-parser';
import Square from '../../models/Square.js';

var router = Router();

router.get('/generate', function(req, res, next) {
    Square.find({}).exec(function(err, data) {
        if (err) {
            console.error('Error getting squares');
            return next(err);
        }

        if (data.length <= 24) res.json(data);
        else {
            var len = data.length;
            var result = [];
            while (result.length < 24) {
                var e = data[Math.floor(Math.random() * len)];
                if (result.indexOf(e) === -1) result.push(e);
            }
            res.json(result);
        }
    });
});

router.get('/squares', function(req, res, next) {
    Square.find().exec(function(err, squares) {
        if (err) {
            console.error('Error retrieving squares');
            return next(err);
        }

        res.json(squares);
    });
});

router.post('/squares/suggest', bodyparser.json(), function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var square = new Square({ text: req.body.text });
    square.save(function(err) {
        if (err) {
            console.error('Error saving new square');
            return next(err);
        }

        res.end();
    });
});

router.put('/squares/:id/approve', function(req, res, next) {
    Square.update({ _id: req.params.id }, { approved: true }, function(err, square) {
        if (err) {
            console.error('Error on square.save');
            return next(err);
        }

        res.end();
    });
});

router.put('/squares/:id/active', function(req, res, next) {
    Square.update({ _id: req.params.id }, { active: req.query.toggle === 'true' }, function(err, square) {
        if (err) {
            console.error('Error on square.save');
            return next(err);
        }

        res.end();
    });
});

export default router;
