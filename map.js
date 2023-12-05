class Map {

    constructor({
        backgroundImage,
        borders,
        width,
        height
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

        }
    };

    draw(ctx) {
        // Draw the map using this.backgroundImage
        ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    }
}

export default Map;

