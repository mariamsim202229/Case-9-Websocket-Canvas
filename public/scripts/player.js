class Player {

    constructor(name, x, y, color, imageSrc) {
        // this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;

        // Add image 
        this.spriteImage = new Image();
        this.spriteImage.src = imageSrc;
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
        ctx.drawImage(
            this.spriteImage,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }
}

export default Player;



