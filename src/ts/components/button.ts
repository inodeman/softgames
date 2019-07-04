import { TweenLite } from "gsap";
import { Container, Graphics, Text } from "pixi.js";
import { fontProps } from "../config";
import { ButtonProps } from "../Props/CardsStackProps";

export class Button extends Container {
    private enabled: boolean = false;
    private settings: ButtonProps;
    private background: Graphics;
    private labelText: Text;
    private childButtons: Button[] = [];

    constructor(label: string, settings: ButtonProps) {
        super();
        this.settings = settings;

        this.createBackground();
        this.createLabel(label);

        this.cursor = "pointer";
    }

    public enable() {
        this.background.tint = 0xffffff;
        this.revealChildButtons();
        this.enabled = true;
    }

    public disable() {
        this.background.tint = this.settings.disabledTint;
        this.hideChildButtons();
        this.enabled = false;
    }

    public get isEnabled(): boolean {
        return this.enabled;
    }

    public addChildButton(child: Button) {
        this.childButtons.push(child);
    }

    public getChildButtons() {
        return this.childButtons || [];
    }

    public updateLabel(newLabel: string) {
        this.labelText.text = newLabel;
    }

    private revealChildButtons() {
        this.childButtons.forEach((childButton) => {
            TweenLite.to(childButton.position, 0.3, {
                y: this.position.y - childButton.height - 10,
            });
        });
    }

    private hideChildButtons() {
        this.childButtons.forEach((childButton) => {
            TweenLite.to(childButton.position, 0.3, {
                y: this.position.y,
            });
        });
    }

    private createBackground() {
        const dimensions = this.settings.dimensions;
        this.background = new Graphics();
        this.background.beginFill(this.settings.backgroundColor);
        this.background.drawRoundedRect(0, 0, dimensions.width, dimensions.height, this.settings.borderRadius);
        this.addChild(this.background);
    }

    private createLabel(label: string) {
        this.labelText = new Text(label, Object.assign({}, fontProps, this.settings.fontSettings));
        this.labelText.anchor.set(0.5, 0.5);
        this.labelText.position.set(this.background.width / 2, this.background.height / 2);
        this.addChild(this.labelText);
    }
}
