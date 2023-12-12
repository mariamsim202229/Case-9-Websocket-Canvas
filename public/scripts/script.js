import Player from "./player.js";
import Map from "./map.js";
 
//1. get element of canvas
const canvas = document.querySelector("canvas");
 
//2. get context of canvas
const ctx = canvas.getContext("2d");
 
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
 
const KEYS = {
    arrowUp: { isPressed: false },
    arrowDown: { isPressed: false },
    arrowLeft: { isPressed: false },
    arrowRight: { isPressed: false },
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
 
let currentMap = winterMap;
 
let player;
 
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
        gameLoop();
    }
}
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    currentMap.draw(ctx);
     // Draw Player 1
     player.draw(ctx);
    // Do movements based on which key is pressed
    handleInput(KEYS, currentMap);
   
    ctx.fillText(obj.message, 50, 50);
    // Do gameLoop again
    requestAnimationFrame(gameLoop);
}
 
// functions
// ----------------------------------------------
 
function handleInput(keys) {
 
    //Mariam borders
    // const borders = map.borders;
    // player 1
    if (keys.arrowUp.isPressed && player.y > 0) {
        player.move(0, -3);
    }
    if (keys.arrowDown.isPressed && (player.y + player.height) < CANVAS_HEIGHT) {
        player.move(0, 3);
    }
    if (keys.arrowLeft.isPressed && player.x > 0) {
        player.move(-3, 0);
    }
    if (keys.arrowRight.isPressed && (player.x + player.width) < CANVAS_WIDTH) {
        player.move(3, 0);
    }
}
 
window.addEventListener('keydown', (event) => {
    console.log("KeyDown event trigged. key", event.key, "has been pressed");
    if (event.key === "ArrowUp") {
        KEYS.arrowUp.isPressed = true;
    } else if (event.key === "ArrowDown") {
        KEYS.arrowDown.isPressed = true;
    } else if (event.key === "ArrowLeft") {
        KEYS.arrowLeft.isPressed = true;
    } else if (event.key === "ArrowRight") {
        KEYS.arrowRight.isPressed = true;
    }
})
window.addEventListener('keyup', (event) => {
    console.log("KeyUp event trigged. key", event.key, "has been released");
    if (event.key === "ArrowUp") {
        KEYS.arrowUp.isPressed = false;
    } else if (event.key === "ArrowDown") {
        KEYS.arrowDown.isPressed = false;
    } else if (event.key === "ArrowLeft") {
        KEYS.arrowLeft.isPressed = false;
    } else if (event.key === "ArrowRight") {
        KEYS.arrowRight.isPressed = false;
    }
})
 
// gameLoop();