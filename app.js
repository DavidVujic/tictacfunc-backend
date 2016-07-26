var express = require('express');
var helmet = require('helmet');
var https = require('https');
var bodyParser = require('body-parser');

var app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200).send('Greetings Professor Function. How about a nice game of Tic Tac Func?');
});

app.get('/play', function (req, res) {
    var game = decodeURIComponent(req.query.game);

    var options = {
        hostname: 'f11xvgecf1.execute-api.us-west-2.amazonaws.com',
        port: 443,
        path: '/prod/play?game=' + encodeURIComponent(game),
        method: 'GET'
    };

    var requestMove = https.request(options, function (moveResponse) {
        moveResponse.on('data', function (move) {
            res.jsonp(move);
        });
    });

    requestMove.end();

    requestMove.on('error', function (e) {
        res.status(200).send(e);
    });
});

var server = app.listen(process.env.PORT || '8080', function () {
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit.');
});
