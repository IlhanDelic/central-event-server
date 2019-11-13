# central-event-server

This program starts a server at a local host (5000).
when activated this server will put out events until the connection is broken.
these events should be picked up by this server(https://github.com/IlhanDelic/satellite-server) 


this programs work by going to the directory in where the central-event-server is based.

now run the command " node ./src/server.js"

go to http://localhost:5000 

(/countdown) (/welcome)


for the sse part add  /countdown or /welcome to the hostname
/countdown is a countdown
/welcome is a event where data is pushed, you'll see welcome and the id number of the post.
