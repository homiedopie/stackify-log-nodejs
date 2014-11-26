var http = require('http');
var util = require('util');
var winston = require('winston');
var stackify = require('./index');
var stack = require('stack-trace');
var pkginfo = require('pkginfo')(module, 'name');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

stackify.start({apiKey: '0Zw8Fj4Hr3Aa1Sf2Gw4Cb3Gk7Fp6Zn6Sc0Gw2Cr', env: 'dev'/*, proxy: 'http://89.22.50.155:3128'*/});

var foo = function foo() {
/*    stackify.warn('sdfg', {dfgh: 45, gh: 67});
    stackify.error('dfg');*/
/*    for (var i = 4; i >= 0; i--) {
        stackify.warn('sdfg');
    };
*/
    stackify.log('error', 'test');
    stackify.error('msg', {error: new Error('simple error')});
};
foo();

/*setInterval(function () {
    stackify.error('test');
}, 1500);*/

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
    foo();
    stackify.warn('sdf');
    var json = JSON.stringify(stackify.storage);
    res.set({"Content-Type": "application/json"});
    res.status(200).send(json);
});

app.post("/post", function (req, res) {
    /* some server side logic */
    something;
    res.send('OK');
});

app.put("/put", function (req, res) {
    stackify.log('info', JSON.stringify(req.query), req.body);
    res.json(stackify.storage[stackify.storage.length - 1]);
});

app.delete("/exc", function (req, res) {
    throw new RangeError('error has been thrown');
});

app.use(stackify.expressExceptionHandler());

app.listen(port, function () {
    console.log("Listening on " + port);
});
