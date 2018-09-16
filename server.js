"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// Port where we'll run the websocket server
const webSocketsServerPort = 1337;

// websocket and http servers
const webSocketServer = require('websocket').server;
const http = require('http');

let history = [ ];

const clients = [ ];


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const  colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];

colors.sort(function(a,b) { return Math.random() > 0.5; } );

const server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});


const wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});


wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    const connection = request.accept(null, request.origin); 
    const index = clients.push(connection) - 1;
    let userColor = false;
    let userName = false;

    console.log((new Date()) + ' Connection accepted.');

    if (history.length > 0) {
         connection.sendUTF(JSON.stringify( { type: 'history', data: history} ));
    }

    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
                const userName = htmlEntities(message.utf8Data);
                userColor = colors.shift();
               
                console.log((new Date()) + ' Received Message from '
                            + userName + ': ' + message.utf8Data);
                
                var obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    color: userColor
                };

                history.push(obj);
                history = history.slice(-100);

                var json = JSON.stringify({ type:'message', data: obj });
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
        }
    });

    connection.on('close', function(connection) {
        if (userName !== false && userColor !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
            colors.push(userColor);
        }
    });

});
