import Player from "./player.js";
import Map from "./map.js";
import Keyboard from "./Keyboard.js";

//1. get element of canvas
const canvas = document.querySelector("canvas");
//2. get context of canvas
const ctx = canvas.getContext("2d");
const keyboard = new Keyboard();
//canvas dimensions
const CANVAS_WIDTH = canvas.getBoundingClientRect().width;
const CANVAS_HEIGHT = canvas.getBoundingClientRect().height;

// DOM elements
// ----------------------------------------------
const messageForm = document.querySelector("#messageForm");
const message = document.querySelector("#message");
const chatHistory = document.querySelector("#chatHistory");
const user = document.querySelector("#user");
const setUser = document.querySelector("#setUser");

// import { MyCanvas } from './MyCanvas.js';
// const myCanvas = new MyCanvas(canvas, ctx);

let player;
let players = [];


// skapa en websocket i klienten
const websocket = new WebSocket("ws://localhost:8081");
// objektet som skickas mellan klient och server
let obj = { type: "", user: "", message: "" };

// event listeners
// ----------------------------------------------
messageForm.addEventListener("submit", sendMessage);
websocket.addEventListener("message", receiveMessage);
setUser.addEventListener("click", confirmSetUser);

// event handlers
// ----------------------------------------------
function sendMessage(event) {
    event.preventDefault();
    console.log("Skicka meddelandet med ws - websocket");
    // chatt meddelande - property type="chat"
    obj.type = "chat";
    obj.user = user.value;
    obj.message = message.value;
    websocket.send(JSON.stringify(obj));
    renderMessage(obj, false);
    message.value = "";
    // skicka till slut nytt websocket meddelande
    websocket.send(JSON.stringify(obj));
}

function receiveMessage(event) {
    console.log("event", event);

    // omvandla event.data till JavaScript objekt
    const obj = JSON.parse(event.data);
    console.log("obj", obj);

    // olika typer av objekt: type="chat" eller type="canvas"
    // hantera med switch
    switch (obj.type) {
        case "chat":
            renderMessage(obj);
            break;
        case "canvas":
            console.log("params:", obj.params);
            writeTextOnCanvas(obj.message);
            break;

        case "newPlayer":
            const newPlayer = new Player(obj.name, obj.params.x, obj.params.y, obj.color, obj.imageSrc);
            players.push(newPlayer);
            break;

        case "movePlayer":
            // iteration
            players.forEach(player => {
                // vilken spelare flyttar sig...
                if (player.name === obj.user) {
                    // uppdatera position 
                    player.x = obj.params.x;
                    player.y = obj.params.y;
                    player.color = obj.color;
                    player.imageSrc = obj.imageSrc
                }
            })
            break;
    }
}

function renderMessage(obj, other = true) {
    // skapa en 'container'
    let div = document.createElement("div");
    div.classList = "container";

    // skapa ett element för meddelandet
    let p = document.createElement("p");
    p.textContent = obj.message;
    if (other) {
        p.classList = "others";
    }

    // skapa ett element för 'user | nickname'
    let span = document.createElement("span");
    span.textContent = obj.user;
    if (other) {
        span.classList = "other";
    }

    // skapa ett element för tid
    let time = document.createElement("time");

    // skapa en tidsstämpel med objektet Date
    let date = new Date();
    time.textContent = date.toLocaleTimeString();
    time.dateTime = date.toISOString();

    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(time);

    // lägg till DOM
    chatHistory.appendChild(div);
}

function writeTextOnCanvas(obj) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(obj.message);
}

// Mariam wintermap
const winterMap = new Map({
    backgroundImage: "./snow-map.png",
    borders: {
        top: 125,
        left: 0,
        right: 230,
        bottom: 0,
    },
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    playerStartingPosition: { x: 100, y: 200 },
}
);
//  const borders = map.borders;

let currentMap = winterMap;

function confirmSetUser() {
    const name = user.value;
    // kontrollera att det finns ett namn
    if (name.length > 2) {
        setUser.classList = "hidden";
        user.setAttribute("disabled", "disabled");
        messageForm.classList = "";
        chatHistory.classList = "";

        // Create player
        player = new Player(name, currentMap.playerStartingPosition.x,
            currentMap.playerStartingPosition.y,
            "transparent",
            "./punk_guy_green.png")

        players.push(player);

        obj.type = "newPlayer";
        obj.user = player.name;
        obj.params = {
            x: currentMap.playerStartingPosition.x,
            y: currentMap.playerStartingPosition.y
        }
        obj.color = "transparent";
        obj.imageSrc = "./punk_guy_green.png"

        websocket.send(JSON.stringify(obj));

        gameLoop();
    }
}

// functions
// ----------------------------------------------

function movePlayer() {
   
  
    const activeKey = keyboard.activeKey(player);
    const speed = 5;

    // let x = player.x;
    // let y = player.y;

    switch (activeKey) {
        case "ArrowUp":
       player.y = player.y - speed <= 0 ? 0 : player.y - speed;
       player.frameY = 3;
       
            break;
        case "ArrowRight":
            player.x = player.x + player.width + speed >= CANVAS_WIDTH ? player.x : player.x + speed;
            player.frameY = 2;

            break;
        case "ArrowDown":
            player.y = player.y + player.height + speed >= CANVAS_HEIGHT ? player.y : player.y + speed;
            // player.y += speed;
            player.frameY = 0;
            break;
        case "ArrowLeft":
            player.x = player.x - speed <= 0 ? 0 : player.x - speed;
            player.frameY = 1;
            break;
        default:
            break;
    }

    console.log("y: ", player.y, "x: ", player.x, "right side of player", player.x + player.width)

   
    // meddela andra via websocket 
    obj.type = "movePlayer";
    obj.user = player.name;
    obj.params = {
        x: player.x,
        y: player.y
    }
    obj.color = "transparent";
    obj.imageSrc = "./punk_guy_green.png"

    websocket.send(JSON.stringify(obj));

    console.log ( player.name, player.x, player.y)
}
/**
 *
 *
 */
function gameLoop() {

        // do movements based on keyboard by the function movePlayer
        movePlayer();
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    currentMap.draw(ctx);
   

    // Draw Player 
    players.forEach(player => {
        player.draw(ctx);
    });
    ctx.fillText(obj.message, 50, 50);
    // Do gameLoop again
    requestAnimationFrame(gameLoop);
}
