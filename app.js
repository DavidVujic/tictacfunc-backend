var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');

var aws = require('./players/awslambda');
var azure = require('./players/azurefunction');

var app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.status(200).send('Greetings Professor Function. How about a nice game of Tic Tac Func?');
});

app.get('/play/awslambda', function(req, res) {
    var eventObj = {
        params: {
            querystring: {
                game: parseGame(req)
            }
        }
    };

    play(aws, eventObj, res);
});

app.get('/play/azurefunction', function(req, res) {
    var eventObj = {
        query: {
            game: parseGame(req)
        }
    };

    play(azure, eventObj, res);
});

function play(target, data, res) {
  console.log(data);
    target.play(data, function(result) {
        console.log(result);
        res.jsonp(result);
    });
}

function parseGame(req) {
    var game = decodeURIComponent(req.query.game);

    return encodeURIComponent(game);
}

var server = app.listen(process.env.PORT || '8080', function() {
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit.');
});
