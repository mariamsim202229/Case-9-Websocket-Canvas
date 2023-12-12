class Keyboard {
    constructor() {
        this.ArrowUp = false;
        this.ArrowRight = false;
        this.ArrowDown = false;
        this.ArrowLeft = false;
        this.PageUp = false;
        this.PageDown = false;
        this.keydown;
        this.keyup;
        this.init();
    }
    init() {
        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowUp":
                    this.ArrowUp = true;
                    break;
                case "ArrowRight":
                    this.ArrowRight = true;
                    break;
                case "ArrowDown":
                    this.ArrowDown = true;
                    break;
                case "ArrowLeft":
                    this.ArrowLeft = true;
                    break;
                case "PageUp":
                    this.PageUp = true;
                    break;
                case "PageDown":
                    this.PageDown = true;
                    break;
            }
            this.keydown = e.code;
        });
        window.addEventListener("keyup", (e) => {    
            switch (e.code) {
                case "ArrowUp":
                    this.ArrowUp = false;
                    break;
                case "ArrowRight":
                    this.ArrowRight = false;
                    break;
                case "ArrowDown":
                    this.ArrowDown = false;
                    break;
                case "ArrowLeft":
                    this.ArrowLeft = false;
                    break;
                case "PageUp":
                    this.PageUp = false;
                    break;
                case "PageDown":
                    this.PageDown = false;
                    break;
            }
            this.keyup = e.code
        });
    }
    status() {
        return {
            ArrowUp: this.ArrowUp,
            ArrowRight: this.ArrowRight,
            ArrowDown: this.ArrowDown,
            ArrowLeft: this.ArrowLeft,
            PageUp: this.PageUp,
            PageDown: this.PageDown,
            keydown: this.keydown,
            keyup: this.keyup,
        }
    }
    activeKey() {
        let keys = this.status();
        return Object.keys(keys).find(key => keys[key] === true);
    }
}
export default Keyboard;