// DOM elements
// ----------------------------------------------
const messageForm = document.querySelector("#messageForm");
const message = document.querySelector("#message");
const chatHistory = document.querySelector("#chatHistory");
const user = document.querySelector("#user");
const setUser = document.querySelector("#setUser");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// dependencies
// ----------------------------------------------

import { MyCanvas } from './MyCanvas.js';
const myCanvas = new MyCanvas(canvas, ctx);

// skapa en websocket i klienten
const websocket = new WebSocket("ws://localhost:8082");

// objektet som skickas mellan klient och server
let obj = { type: "", user: "", message: "" };

// rita en cirkel i canvas elementet
ctx.arc(50, 50, 20, 0, Math.PI * 2, false);
ctx.fillStyle = "yellow";
ctx.fill();

// rita en cirkel med hjälp av klassen MyCanvas
// myCanvas.circle(200, 100, 10, "green");
// myCanvas.circle(220, 125, 7, "red");


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

    // canvas instruktion
    obj.type = "canvas";
    obj.method = "circle";
    obj.params = {
        x: randomBetween(0, canvas.width),
        y: randomBetween(0, canvas.height),
        radius: randomBetween(2, 25),
        color: "blue"
    }

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
            myCanvas.circle(obj.params.x, obj.params.y, obj.params.radius, obj.params.color);
            myCanvas.writeText(obj.message, 50, 50);
            break;
    }

}

function confirmSetUser() {
    const name = user.value;
    // kontrollera att det finns ett namn
    if (name.length > 2) {
        setUser.classList = "hidden";
        user.setAttribute("disabled", "disabled");
        messageForm.classList = "";
        chatHistory.classList = "";
    }
}

// functions
// ----------------------------------------------
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

function randomBetween(min, max) {
    let r = Math.random() * (max - min) + min;
    return Math.floor(r);
} 