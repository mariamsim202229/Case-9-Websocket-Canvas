import Player from "./player.js";
import Map from "./map.js";

//1. get element of canvas

const canvasEl = document.querySelector("#canvas");

//2. get context of canvas

const ctx = canvasEl.getContext("2d")

//canvas dimensions 
const CANVAS_WIDTH = canvasEl.getBoundingClientRect().width;
const CANVAS_HEIGHT = canvasEl.getBoundingClientRect().height;

// BG MAP
//  mapBg = new Image();
//  mapBg.src = "./images/snow-map.png";
//  mapWidth = CANVAS_WIDTH;
//  mapHeight = CANVAS_HEIGHT;


const KEYS = {
    arrowUp: { isPressed: false },
    arrowDown: { isPressed: false },
    arrowLeft: { isPressed: false },
    arrowRight: { isPressed: false },

    a: { isPressed: false },
    b: { isPressed: false },
    c: { isPressed: false },
    d: { isPressed: false }

}

// Mariam wintermap
const winterMap = new Map({
    backgroundImage: "./images/snow-map.png",
    borders: {
        top: 125,
        left: 0,
        right: 230,
        bottom: 0,
    },
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    player1StartingPosition: { x: 100, y: 200 },
    player2StartingPosition: { x: 200, y: 400 },

}

);

let currentMap = winterMap;

const player1 = new Player(40, 60, "black");
const player2 = new Player(40, 60, "hotpink");

function handleInput(keys) {

    //Mariam borders

    // const borders = map.borders;


    // player 1
    if (keys.arrowUp.isPressed && player1.y > 0) {
        player1.move(0, -3);
    }
    if (keys.arrowDown.isPressed && (player1.y + player1.height) < CANVAS_HEIGHT) {
        player1.move(0, 3);
    }
    if (keys.arrowLeft.isPressed && player1.x > 0) {
        player1.move(-3, 0);
    }
    if (keys.arrowRight.isPressed && (player1.x + player1.width) < CANVAS_WIDTH) {
        player1.move(3, 0);
    }
    // player 2
    if (keys.a.isPressed && player2.y > 0) {
        player2.move(0, -3);
    }
    if (keys.b.isPressed && (player2.y + player2.height) < CANVAS_HEIGHT) {
        player2.move(0, 3);
    }
    if (keys.c.isPressed && player2.x > 0) {
        player2.move(-3, 0);
    }
    if (keys.d.isPressed && (player2.x + player2.width) < CANVAS_WIDTH) {
        player2.move(3, 0);
    }
}

function gameLoop() {
    // Clear canvas 
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // ctx.drawImage(mapBg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    currentMap.draw(ctx);
    // Do movements based on which key is pressed
    handleInput(KEYS);
    // Draw Player 1
    player1.draw(ctx);
    // Draw Player 2
    player2.draw(ctx);
    // Do gameLoop again 
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
    console.log("KeyDown event trigged. key", event.key, "has been pressed");
    // Player 1
    if (event.key === "ArrowUp") {
        // player1y += -1;
        // player1.move(0, -1);
        KEYS.arrowUp.isPressed = true;
    } else if (event.key === "ArrowDown") {
        // player1.move(0, 1);
        KEYS.arrowDown.isPressed = true;
    } else if (event.key === "ArrowLeft") {
        // player1.move(-1, 0);
        KEYS.arrowLeft.isPressed = true;
    } else if (event.key === "ArrowRight") {
        // player1.move(1, 0);
        KEYS.arrowRight.isPressed = true;
    }
    // Player 2
    if (event.key === "a") {
        // player2y += -1;
        // player2.move(0, -1);
        KEYS.a.isPressed = true;
    } else if (event.key === "b") {
        // player2.move(0, 1);
        KEYS.b.isPressed = true;
    } else if (event.key === "c") {
        // player2.move(-1, 0);
        KEYS.c.isPressed = true;
    } else if (event.key === "d") {
        // player2.move(1, 0);
        KEYS.d.isPressed = true;
    }
})

window.addEventListener('keyup', (event) => {
    console.log("KeyUp event trigged. key", event.key, "has been released");
    // Player 1
    if (event.key === "ArrowUp") {
        // player1y += -1;
        // player1.move(0, -1);
        KEYS.arrowUp.isPressed = false;
    } else if (event.key === "ArrowDown") {
        // player1.move(0, 1);
        KEYS.arrowDown.isPressed = false;
    } else if (event.key === "ArrowLeft") {
        // player1.move(-1, 0);
        KEYS.arrowLeft.isPressed = false;
    } else if (event.key === "ArrowRight") {
        // player1.move(1, 0);
        KEYS.arrowRight.isPressed = false;
    }
    // Player 2
    if (event.key === "a") {
        // player2y += -1;
        // player2.move(0, -1);
        KEYS.a.isPressed = false;
    } else if (event.key === "b") {
        // player2.move(0, 1);
        KEYS.b.isPressed = false;
    } else if (event.key === "c") {
        // player2.move(-1, 0);
        KEYS.c.isPressed = false;
    } else if (event.key === "d") {
        // player2.move(1, 0);
        KEYS.d.isPressed = false;
    }
})

gameLoop();