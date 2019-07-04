import { Container, Sprite, Text } from "pixi.js";
import { ImageAndTextProps } from "../../Props/CardsStackProps";

export class ImageText extends Container {
    private settings: ImageAndTextProps;

    private regex = new RegExp(/(?={)(.*?)(})/g);
    private rawText: string;
    private images: Sprite[];

    constructor(rawText: string, imageMap: Map<string, string>, settings: ImageAndTextProps) {
        super();
        this.settings = settings;
        this.rawText = rawText;
        this.getImages(imageMap);
        this.writeText();
        this.align();
    }

    private getImages(imageMap: Map<string, string>) {
        const imageMatches = this.rawText.match(this.regex);
        this.images = [];
        if (imageMatches !== null) {
            imageMatches.forEach((image) => {
                const imageURL = imageMap.get(image.substr(1, image.length - 2));
                if (imageURL === undefined) {
                    console.error(`No key matching ${image} in provided ImageMap`);
                } else {
                    this.images.push(Sprite.fromFrame(imageURL));
                }
            });
        }
    }

    private writeText() {
        let xPos = 0;
        let imageIndex = 0;
        const matches = this.rawText.match(this.regex) || [];
        matches.forEach((textFragment) => {
            const textBefore = this.rawText.substr(0, this.rawText.indexOf(textFragment));
            this.rawText = this.rawText.substr(textBefore.length + textFragment.length, this.rawText.length);
            if (textBefore.length > 0) {
                const textElement = new Text(textBefore, this.settings);
                textElement.anchor.set(0, 0);
                textElement.position.set(xPos, 0);
                this.addChild(textElement);
                xPos += textElement.width;
            }

            const sprite = this.images[imageIndex];
            const scale = this.settings.fontSize as number / sprite.height;
            sprite.scale.set(scale);
            xPos += sprite.width / 2 + this.settings.imagePadding;
            this.addChild(sprite);
            sprite.anchor.set(0.5, 0);
            sprite.position.set(xPos, 0);
            xPos += sprite.width / 2 + this.settings.imagePadding;
            imageIndex++;
        });

        if (this.rawText.length > 0) {
            const remainingTextElement = new Text(this.rawText, this.settings);
            remainingTextElement.anchor.set(0, 0);
            remainingTextElement.position.set(xPos, 0);
            this.addChild(remainingTextElement);
        }
    }

    private align() {
        switch (this.settings.align) {
            case "right":
                this.pivot.set(this.width, this.pivot.y);
                break;
            case "center":
                this.pivot.set(this.width / 2, this.pivot.y);
                break;
            default:
                this.pivot.set(0, this.pivot.y);
                break;
        }
        switch (this.settings.verticalAlign) {
            case "top":
                this.pivot.set(this.pivot.x, 0);
                break;
            case "center":
                this.pivot.set(this.pivot.x, this.height / 2);
                break;
            default:
                this.pivot.set(this.pivot.x, this.height);
                break;
        }
    }
}
