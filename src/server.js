"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const http = require('http');
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (req, res) {
    res.write('hello there');
});
app.get('/welcome', function (req, res) {
    res.status(200).set({
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
app.get('/countdown', function (req, res) {
    res.status(200).set({
        connection: "keep alive",
        "cache-control": "no-cache",
        "content-Type": "text/event-stream",
    });
    countdown(res, 13);
});
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
app.listen(process.env.PORT || 5000, function () { return console.log("go to http://localhost:5000 or https://sse-test2.herokuapp.com"); });
