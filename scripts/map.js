class Map {

    constructor({
        backgroundImage,
        borders,
        width,
        height,
        playerStartingPosition
    }) {

        this.backgroundImage = new Image();
        this.backgroundImage.src = backgroundImage;
        this.width = width;
        this.height = height;
        this.border = {
            top: borders.top,
            left: borders.left,
            right: borders.right,
            bottom: borders.bottom,
        };
        this.playerStartingPosition = playerStartingPosition;
      
    }

    draw(ctx) {
        // Draw the map using this.backgroundImage
        ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    }
}

export default Map;

