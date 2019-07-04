import { Container } from "pixi.js";
import { Button } from "../components/button";
import { menuProps } from "../config";
import { inMobile } from "../Props/CardsStackProps";

export class Menu extends Container {
    public static cardsStackOption: string = "CARDS_STACK";
    public static crazyTextOption: string = "CRAZY_TEXT";
    public static funFireOption: string = "FUN_FIRE";
    private static buttonNames: string[] = ["Cards", "Text", "Song of Fire"];
    private taskButtons: Button[];

    constructor() {
        super();
        this.createButtons();
    }

    private createButtons() {
        this.taskButtons = [];
        menuProps.buttonSettings.forEach((buttonSettings, index) => {
            const button = new Button(Menu.buttonNames[index], buttonSettings);
            const buttonPos = inMobile ? buttonSettings.mobilePosition : buttonSettings.position;
            button.interactive = true;
            button.on("pointerup", () => this.buttonClicked(index));
            button.pivot.set(button.width / 2, 0);
            button.position.set(buttonPos.x, buttonPos.y);
            this.taskButtons.push(button);
            button.disable();
            this.addChild(button);
        });
    }

    private buttonClicked(parentIndex: number, childIndex?: number) {
        const parentAlreadyEnabled = this.taskButtons[parentIndex].isEnabled;
        let childAlreadyEnabled = true;
        if (childIndex !== undefined) {
            if (!this.taskButtons[parentIndex].getChildButtons()[childIndex].isEnabled) {
                childAlreadyEnabled = false;
            }
        }
        if (parentAlreadyEnabled && childAlreadyEnabled) { 
            return; 
        }

        this.taskButtons.forEach((button, index) => {
            index === parentIndex ? button.enable() : button.disable();
            button.getChildButtons().forEach((childButton, childrenIndex) => {
                if (index === parentIndex && ((childIndex === undefined && childrenIndex === 0) || (childIndex === childrenIndex))) {
                    childButton.enable();
                } else {
                    childButton.disable();
                }
            });
        });

        switch (parentIndex) {
            case 0:
                this.emit(Menu.cardsStackOption);
                break;
            case 1:
                this.emit(Menu.crazyTextOption);
                break;
            case 2:
                this.emit(Menu.funFireOption);
                break;
            default:
                break;
        }
    }
}
