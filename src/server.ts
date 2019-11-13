//intalling the requireries
//----------------------------------------------------------------------------------------
//const http = require('http');
import express = require('express');
const app = express();
//the first eventstream which simply prints "hello there"
//----------------------------------------------------------------------------------------
app.get('/' , (req, res) => {
    res.set({
        connection: "keep alive",
        "cache-control": "no-cache",
        "content-Type": "text/event-stream",
    });
    res.write(`hello there\n\n`);
});
//----------------------------------------------------------------------------------------
app.get('/eventstream', (req, res, next) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    app.on('message', data => {
        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
});
//----------------------------------------------------------------------------------------
app.get('/welcome' , (req, res) => {
    res.set({
        connection: "keep alive",
        "cache-control": "no-cache",
        "content-Type": "text/event-stream",
    });
    let id = 0;

    setInterval(() => {
        res.write(`welcome\n id:${id} \n\n`);
        id++;
        if (id > 120){
            res.write(`id: -1\n are you a sleep? \n\n\n`);
            res.end();
        }
    }, 1000);

});
//----------------------------------------------------------------------------------------
app.get('/countdown', (req, res) =>{
    res.set({
        connection: "keep alive",
        "cache-control": "no-cache",
        "content-Type": "text/event-stream",
    });
countdown(res, 13)
});
//----------------------------------------------------------------------------------------
function countdown(res: any, count: number){
    res.write(`data: time left ${count} \n\n`);
    if (count){
        setTimeout(() => countdown(res, count-1), 1000)
    }
    else {
        res.write(`times up! \n\n`);
        res.end();
    }
}
//----------------------------------------------------------------------------------------
app.listen( process.env.PORT || 5000, () => console.log("go to http://localhost:5000 or https://sse-test2.herokuapp.com"));