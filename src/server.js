"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//intalling the requireries
//----------------------------------------------------------------------------------------
//const http = require('http');
var express = require("express");
var app = express();
//the first eventstream which simply prints "hello there"
//----------------------------------------------------------------------------------------
app.get('/', function (req, res) {
    res.set({
        connection: "keep alive",
        "cache-control": "no-cache",
        "content-Type": "text/event-stream",
    });
    res.write("hello there\n\n");
});
//----------------------------------------------------------------------------------------
app.get('/eventstream', function (req, res, next) {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    app.on('message', function (data) {
        res.write("event: message\n");
        res.write("data: " + JSON.stringify(data) + "\n\n");
    });
});
//----------------------------------------------------------------------------------------
app.get('/welcome', function (req, res) {
    res.set({
        connection: "keep alive",
        "cache-control": "no-cache",
        "content-Type": "text/event-stream",
    });
    var id = 0;
    setInterval(function () {
        res.write("welcome\n id:" + id + " \n\n");
        id++;
        if (id > 120) {
            res.write("id: -1\n are you a sleep? \n\n\n");
            res.end();
        }
    }, 1000);
});
//----------------------------------------------------------------------------------------
app.get('/countdown', function (req, res) {
    res.set({
        connection: "keep alive",
        "cache-control": "no-cache",
        "content-Type": "text/event-stream",
    });
    countdown(res, 13);
});
//----------------------------------------------------------------------------------------
function countdown(res, count) {
    res.write("data: time left " + count + " \n\n");
    if (count) {
        setTimeout(function () { return countdown(res, count - 1); }, 1000);
    }
    else {
        res.write("times up! \n\n");
        res.end();
    }
}
//----------------------------------------------------------------------------------------
app.listen(process.env.PORT || 5000, function () { return console.log("go to http://localhost:5000 or https://sse-test2.herokuapp.com"); });
