import { TweenLite } from "gsap";
import { Text, TextStyleOptions, ticker } from "pixi.js";
import { fpsMeterProps } from "../config";

export class FPSDisplay extends Text {
    constructor(options: TextStyleOptions) {
        super("", options);
        this.update();
    }

    private update() {
        this.text = `${Math.floor(ticker.shared.FPS)} fps`;
        TweenLite.delayedCall(fpsMeterProps.updateFrequency, this.update.bind(this));
    }
}
