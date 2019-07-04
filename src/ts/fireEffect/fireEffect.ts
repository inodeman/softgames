import { Power1, TweenLite } from "gsap";
import { Emitter } from "pixi-particles";
import { Container, Texture, ticker } from "pixi.js";
import { desktopRect, fireEffectProps, mobileRect } from "../config";
import { getScreenRect, inMobile } from "../Props/CardsStackProps";

declare function playFire(): any;

export class FireEffect extends Container {
    private delta: number = 0.025;
    private fire: Emitter;
    private vapor: Emitter;

    constructor() {
        super();
        this.lightMyFire();
        this.doGamesVapor();
        this.playNext();
        ticker.shared.add(this.doUpdate.bind(this));
        playFire();
    }

    public destroy() {
        super.destroy();
        ticker.shared.remove(this.doUpdate.bind(this));
        if (this.fire) {
            this.fire.cleanup();
            this.fire.destroy();
        }
        if (this.vapor) {
            this.vapor.cleanup();
            this.vapor.destroy();
        }
    }

    private playNext() {
        this.delta = 0.06;
        TweenLite.to(this, 3, {
            deltaTimeMod: 0.025,
            ease: Power1.easeInOut,
        });
    }

    private doUpdate(deltaTime: number) {
        this.fire.update(deltaTime * this.delta);
        this.vapor.update(deltaTime * this.delta);
    }

    private lightMyFire() {
        const emitterSettings = fireEffectProps.fireProps.emitterSettings;
        emitterSettings.spawnRect.w = getScreenRect().width;
        emitterSettings.pos.x = 0;
        emitterSettings.pos.y = getScreenRect().height + 50;
        this.fire = new Emitter(this, fireEffectProps.fireProps.particleImages.map((url) => Texture.fromFrame(url)), emitterSettings);
        if (inMobile) {
            this.fire.frequency /= (mobileRect.width / desktopRect.width);
        }
        this.fire.emit = true;
    }

    private doGamesVapor() {
        const emitterSettings = fireEffectProps.vaporProps.emitterSettings;
        emitterSettings.spawnRect.w = getScreenRect().width;
        emitterSettings.pos.x = 0;
        emitterSettings.pos.y = getScreenRect().height;
        emitterSettings.lifetime.max = emitterSettings.lifetime.min = inMobile ? 20 : 9;
        this.vapor = new Emitter(this, fireEffectProps.vaporProps.particleImages.map((url) => Texture.fromFrame(url)), emitterSettings);
        if (inMobile) {
            this.vapor.frequency /= (mobileRect.width / desktopRect.width);
        }
        this.vapor.emit = true;
    }
}
