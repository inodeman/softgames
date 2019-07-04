import { Power1, TweenLite } from "gsap";
import { CanvasRenderer, Container, Text, WebGLRenderer } from "pixi.js";
import { cardsStackProps, fontProps } from "../config";
import { getRandom, getScreenRect, inMobile } from "../Props/CardsStackProps";
import { ImageCard } from "./components/imageCard";

declare function playCards(): any;

export class Cards extends Container {
    private loopTween: TweenLite;
    private cards: ImageCard[];
    private reverse: boolean = false;
    private loadingText: Text;

    constructor(renderer: WebGLRenderer |CanvasRenderer) {
        super();
        this.name = "Cards Stack Demo";
        this.createLoadingText();
        this.init(renderer);
        playCards();
    }

    public destroy() {
        super.destroy();
        if (this.loopTween) {
            this.loopTween.kill();
        }
    }

    private removeLoadingText() {
        this.removeChild(this.loadingText);
    }

    private createLoadingText() {
        const dimensions = getScreenRect();
        this.loadingText = new Text("Thy wish is my command!", Object.assign({}, fontProps, cardsStackProps.loadingTextStyleOptions));
        this.loadingText.anchor.set(0.5, 0.5);
        this.loadingText.position.set(dimensions.width / 2, dimensions.height / 2);
        this.addChild(this.loadingText);
    }

    private async init(renderer: WebGLRenderer |CanvasRenderer) {
        await this.generateStack(renderer);
        this.moveNextCard(0);
    }

    private async generateStack(renderer: WebGLRenderer | CanvasRenderer) {
        this.cards = [];
        let lower = 0;
        let upper = 0;
        const instanceBatchAmount = 6;
        while (upper < cardsStackProps.cardCount) {
            lower = upper;
            upper = Math.min(upper + instanceBatchAmount, cardsStackProps.cardCount);
            for (let i = lower; i < upper; i++) {
                const newCard = new ImageCard(cardsStackProps.cardCount - i, renderer);
                const position = inMobile ? cardsStackProps.initialCardsStackProps.mobilePosition : cardsStackProps.initialCardsStackProps.position;
                newCard.anchor.set(0.5, 0.5);
                newCard.position.set(position.x + cardsStackProps.initialCardsStackProps.offset.x * i, position.y + cardsStackProps.initialCardsStackProps.offset.y * i);
                newCard.visible = false;
                this.cards.push(newCard);
                this.addChild(newCard);
            }
            await new Promise((resolve) => requestAnimationFrame(resolve));
        }
        this.removeLoadingText();
        this.cards.forEach((card) => card.visible = true);
        this.cards.reverse();
    }

    private moveNextCard(index: number, toRight: boolean = true) {
        const delay = cardsStackProps.moveInterval;
        if (index >= this.cards.length) {
            if (!this.reverse) {
                return;
            }
            index = 0;
            toRight = !toRight;
            this.cards.reverse();
        }
        this.moveCard(index, toRight);
        this.loopTween = TweenLite.delayedCall(delay, () => { this.moveNextCard(index + 1, toRight); });
    }

    private moveCard(index: number, toRight: boolean = true) {
        const card = this.cards[index];
        const tweenTime = cardsStackProps.timeToMove ;
        let rotation = 0;
        let finalPosition;
        if (toRight) {
                const targetPosition = inMobile ? cardsStackProps.cardsStackProps.mobilePosition  : cardsStackProps.cardsStackProps.position;
                const offset = { x: cardsStackProps.cardsStackProps.offset.x * getRandom(), y: cardsStackProps.cardsStackProps.offset.y * getRandom() };
                finalPosition = { x: targetPosition.x + offset.x, y: targetPosition.y + offset.y };
                rotation = getRandom() * Math.PI * 0.35;
        } else {
            const targetPosition = inMobile ? cardsStackProps.initialCardsStackProps.mobilePosition : cardsStackProps.initialCardsStackProps.position;
            const offset = {
                x: cardsStackProps.initialCardsStackProps.offset.x * index,
                y: cardsStackProps.initialCardsStackProps.offset.y * index,
            };
            finalPosition = { x: targetPosition.x + offset.x, y: targetPosition.y + offset.y };
            rotation = 0;
        }
        const moveTween = new TweenLite(card.position, tweenTime, {
            ease: Power1.easeInOut,
            onStart: () => {
                this.removeChild(card);
                this.addChildAt(card, this.children.length);
            },
            x: finalPosition.x,
            y: finalPosition.y,
        });
        if (rotation !== card.rotation) {
            const rotateTween = new TweenLite(card, tweenTime, { ease: Power1.easeInOut, rotation });
        }
    }
}
