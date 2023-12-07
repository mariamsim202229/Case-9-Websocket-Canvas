class Player {

    constructor(x, y, color,) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 25;
        this.height = 25;
        console.log("a player instance was created with color", this.color);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

}

export default Player;