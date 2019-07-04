import { TweenLite } from "gsap";
import { Container } from "pixi.js";
import { fontProps, textAndImagesProps } from "../config";
import { getScreenRect, inMobile } from "../Props/CardsStackProps";
import { ImageText } from "./components/imageText";

declare function playImagesAndSounds(): any;

export class TextAndImages extends Container {
    private loopTween: TweenLite;
    private imageMap: Map<string, string>;
    private imageText: ImageText;

    constructor() {
        super();
        this.name = "Text And Images Container";
        this.initSpritesMap();
        this.generateTextFromSamples();
        playImagesAndSounds();
    }

    public destroy() {
        super.destroy();
        if (this.loopTween) {
            this.loopTween.kill();
        }
    }

    private initSpritesMap() {
        this.imageMap = new Map<string, string>();
        this.imageMap.set("game1", "assets/img/game1.png");
        this.imageMap.set("game2", "assets/img/game2.png");
        this.imageMap.set("game3", "assets/img/game3.png");
        this.imageMap.set("game4", "assets/img/game4.png");
    }

    private generateTextFromSamples() {
        let text = "";
        for (let i = 0; i < textAndImagesProps.componentCount; ++i) {
            if (Math.random() > 0.5) {
                text += textAndImagesProps.imageChoices[Math.floor(Math.random() * textAndImagesProps.imageChoices.length)];
            } else {
                text += textAndImagesProps.textChoices[Math.floor(Math.random() * textAndImagesProps.textChoices.length)];
            }
            if (i < textAndImagesProps.componentCount - 1) {
                text += " ";
            }
        }

        if (this.imageText) {
            this.removeChild(this.imageText);
        }

        const imageTextStyleOptions = Object.assign({}, fontProps, textAndImagesProps.imageTextStyleOptions);
        imageTextStyleOptions.fontSize = (Math.random() * 30 + 20) * (inMobile ? 1 : 2);
        this.imageText = new ImageText(text, this.imageMap, imageTextStyleOptions);
        this.imageText.position.set(getScreenRect().width / 2, getScreenRect().height / 2);
        this.addChild(this.imageText);
        this.loopTween = TweenLite.delayedCall(2, this.generateTextFromSamples.bind(this));
    }
}
