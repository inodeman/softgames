import { Container, Sprite, Text, TextStyleOptions } from "pixi.js";
import { fontProps, mainTaskProps } from "../config";
import { getScreenRect, inMobile } from "../Props/CardsStackProps";

export class MainMenu extends Container {
    private text: Text;

    constructor() {
        super();
        this.createText();
    }

    private createText() {
        const dimensions = getScreenRect();
        const textStyleOptions: TextStyleOptions = mainTaskProps.textStyleOptions;
        textStyleOptions.fontSize = inMobile ? mainTaskProps.mobileFontSize : mainTaskProps.desktopFontSize;
        this.text = new Text("Select an option my master", Object.assign({}, fontProps, textStyleOptions));
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(dimensions.width / 2, dimensions.height / 2);
        this.addChild(this.text);
        const sprity = Sprite.fromFrame("assets/img/igor.png");
        sprity.scale.set(2.0);
        sprity.position.set((getScreenRect().width / 2) - (sprity.width / 2), 5);
        this.addChild(sprity);
    }
}
