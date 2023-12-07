import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const port = 8081;

app.use(express.static('public'));


const server = http.createServer(app);

const wss = new WebSocketServer({ noServer: true });

// ... handskakning - upgrade required
server.on('upgrade', (req, socket, head) => {
    console.log("client upgrade required");

    // starta websocket
    wss.handleUpgrade(req, socket, head, (ws) => {
        console.log(`Client agent: ${req.headers['user-agent']}`);

        // skicka vidare
        wss.emit('connection', ws, req);
    });
});


// lyssna på event 'connection'
wss.on('connection', (ws) => {
    console.log(`Client connected to server, number of clients: ${wss.clients.size}`);

    ws.on('close', () => {
        console.log(`Client left, number of remaining clients: ${wss.clients.size}`);
    });

    ws.on('message', (data) => {
        // console.log("data", data);
        const obj = JSON.parse(data);
        console.log("obj", obj);

        // objektet kan innehåll chat meddelande eller ex canvas instruktion
        // kontrollera objektet och dirigera via ex switch eller if-else
        switch (obj.type) {
            case "chat":
                broadcastExclude(wss, ws, obj);
                break;
            case "canvas":
                broadcast(wss, obj);
                break;
        }

    });

});

server.listen(port, (req, res) => {
    console.log(`server running on port ${port}`);
});


// en funktion som skickar till alla klienter
function broadcast(wss, obj) {

    // skicka vidare info till alla klienter som är anslutna
    wss.clients.forEach(client => {
        client.send(JSON.stringify(obj));
    });
}

// en funktion som skickar till alla klienter - förutom en (finns som parameter)
function broadcastExclude(wss, ws, obj) {

    // skicka vidare info till alla klienter som är anslutna - förutom 'ws'
    wss.clients.forEach(client => {
        if (client !== ws) {
            client.send(JSON.stringify(obj));
        }
    });
}