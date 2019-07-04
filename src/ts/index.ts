import { Application, Container, loader } from "pixi.js";
import * as WebFont from "webfontloader";
import { Cards } from "./cards/cards";
import { FPSDisplay } from "./components/FPSDisplay";
import { appProps,
         images,
         desktopRect,
         fontProps,
         fpsMeterProps,
         mobileRect } from "./config";
import { FireEffect } from "./fireEffect/fireEffect";
import { MainMenu } from "./mainMenu/mainMenu";
import { Menu } from "./menu/menu";
import { inMobile} from "./Props/CardsStackProps";
import { TextAndImages } from "./textAndImages/textAndImages";

export class MainApp {
    private app: Application;
    private html5Canvas: HTMLCanvasElement;
    private fpsDisplay: FPSDisplay;
    private mainMenu: Menu;
    private view: Container;

    constructor() {
        this.init();
    }

    private async init() {
        await this.setFonts();
        this.pixiInit();
        this.initCSS();

        await this.assetsDoLoad().catch((error) => {
            console.error(error);
        });
        this.initMenuSelector();
    }

    private setFonts(): Promise<void> {
        return new Promise((resolve, reject) => {
            const config: WebFont.Config = fontProps;
            config.active = resolve;
            WebFont.load(config);
        });
    }

    private initCSS() {
        document.body.style.margin = "0px";
        document.body.style.overflow = "hidden";
        const mobileRatio = mobileRect.width / mobileRect.height;
        const mobileVH = Math.floor(mobileRatio * 100000) / 1000 + "vh";
        const mobileMaxWidth = (mobileRatio * window.innerHeight) + "px";
        const mobileMaxHeight = window.innerHeight + "px";
        const desktopRatio = desktopRect.height / desktopRect.width;
        const desktopVW = Math.floor(desktopRatio * 100000) / 1000 + "vw";
        const desktopInverseRatio = desktopRect.width / desktopRect.height;
        const desktopVH = Math.floor(desktopInverseRatio * 100000) / 1000 + "vh";
        this.html5Canvas = document.querySelector("canvas");
        this.html5Canvas.style.width = inMobile ? mobileVH : "100vw";
        this.html5Canvas.style.height = inMobile ? "100vh" : desktopVW;
        this.html5Canvas.style.maxWidth = inMobile ? mobileMaxWidth : desktopVH;
        this.html5Canvas.style.maxHeight = inMobile ? mobileMaxHeight : "100vh";
        this.html5Canvas.style.margin = "auto";
        this.html5Canvas.style.position = "absolute";
        this.html5Canvas.style.top = "0";
        this.html5Canvas.style.bottom = "0";
        this.html5Canvas.style.right = "0";
        this.html5Canvas.style.left = "0";
    }

    private pixiInit() {
        this.app = new Application(appProps);
        document.body.appendChild(this.app.view);
    }

    private assetsDoLoad(): Promise<void> {
        return new Promise((resolve, reject) => {
            images.forEach((assetURL) => {
                loader.add(assetURL);
            });
            loader.on("complete", () => {
                resolve();
            });
            loader.on("error", () => reject.bind(this));
            loader.load();
        });
    }

    private removeFromView() {
        if (this.view !== undefined) {
            this.app.stage.removeChild(this.view);
            this.view.destroy();
        }
    }

    private initCardStacks() {
        this.removeFromView();
        this.view = new Cards(this.app.renderer);
        this.app.stage.addChildAt(this.view, 0);
    }

    private initTextAndImages() {
        this.removeFromView();
        this.view = new TextAndImages();
        this.app.stage.addChildAt(this.view, 0);
    }

    private initFireEffect() {
        this.removeFromView();
        this.view = new FireEffect();
        this.app.stage.addChildAt(this.view, 0);
    }

    private initMenuSelector() {
        this.mainMenu = new Menu();
        this.app.stage.addChild(this.mainMenu);
        const mainMenu = new MainMenu();
        this.view = mainMenu;
        this.app.stage.addChildAt(this.view, 0);
        this.mainMenu.on(Menu.cardsStackOption, this.initCardStacks.bind(this));
        this.mainMenu.on(Menu.crazyTextOption, this.initTextAndImages.bind(this));
        this.mainMenu.on(Menu.funFireOption, this.initFireEffect.bind(this));
        this.initFPSDisplay();
    }

    private initFPSDisplay() {
        this.fpsDisplay = new FPSDisplay(Object.assign({}, fontProps, fpsMeterProps.textStyleOptions));
        this.fpsDisplay.position.set(fpsMeterProps.position.x, fpsMeterProps.position.y);
        this.app.stage.addChild(this.fpsDisplay);
    }
}

const mainApp = new MainApp();
