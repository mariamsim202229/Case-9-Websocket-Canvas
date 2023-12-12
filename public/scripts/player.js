class Player {
    /**
     * Creates an instance of Player.
     * @param {*} name
     * @param {*} x
     * @param {*} y
     * @param {*} color
     * @param {*} imageSrc
     * @memberof Player
     */
    constructor(name, x, y, color, imageSrc) {
        // this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;

        // Add image 
        this.spriteImage = new Image();
        this.spriteImage.src = imageSrc;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 64;
        this.spriteHeight = 80;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        console.log("a player instance was created with color",
            this.color,
            "and this image:",
            this.spriteImage);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fill();
        
        ctx.drawImage(
            this.spriteImage,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    // move(x, y) {
    //     this.x += x;
    //     this.y += y;
    // }
}

export default Player;



