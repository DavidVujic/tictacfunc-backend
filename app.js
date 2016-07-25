var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200).send('Hello world');
});

app.get('/play', function (req, res) {
    var game = req.query.game;
    var callback = req.query.callback;

    var options = {
        hostname: 'f11xvgecf1.execute-api.us-west-2.amazonaws.com',
        port: 443,
        path: '/prod/play?game=' + game + '&callback=' + callback,
        method: 'GET'
    };

    var httpReq = https.request(options, function (httpRes) {
        httpRes.on('data', function (d) {
            res.jsonp(d);
        });
    });
    httpReq.end();

    httpReq.on('error', function (e) {
        res.status(200).send(e);
    });
});

// Start the server
var server = app.listen(process.env.PORT || '8080', function () {
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit.');
});
