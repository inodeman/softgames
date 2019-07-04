import { ApplicationOptions, TextStyleOptions } from "pixi.js";
import { CardsStackProps, FireEffectProps, FPSProps, MainTaskProps, MenuProps, RectangleDimensions, TextAndImagesProps } from "./Props/CardsStackProps";
import { getScreenRect } from "./Props/CardsStackProps";

export const desktopRect: RectangleDimensions = { height: 1080, width: 1920 };
export const mobileRect: RectangleDimensions = { height: 1920, width: 1080 };
export const fontProps: WebFont.Config = { google: { families: ["Oswald"] }};

export const appProps: ApplicationOptions = {
    antialias: true,
    backgroundColor: 0xE78BE7,
    height: getScreenRect().height,
    width: getScreenRect().width,
};

export const images: string[] = [
    "assets/img/game1.png",
    "assets/img/game2.png",
    "assets/img/game3.png",
    "assets/img/game4.png",
    "assets/img/particle.png",
    "assets/img/smoke.png",
    "assets/img/fire.png",
    "assets/img/igor.png"
];

export const fpsMeterProps: FPSProps = {
    position: { x: 50, y: 50 },
    textStyleOptions: { fill: 0xffffff, fontSize: 30 },
    updateFrequency: 0.1,
};

export const menuProps: MenuProps = {
    buttonSettings: [
        {
            backgroundColor: 0xFFFFFA,
            borderRadius:5,
            dimensions: { height: 75, width: 250 },
            disabledTint: 0xFF12FF,
            fontSettings: { align: "center", fill: 0x000000, fontSize: 40 },
            mobilePosition: { x: 210, y: 1790 },
            position: { x: 525, y: 800}
        },
        {
            backgroundColor: 0xFFFFFA,
            borderRadius: 5,
            dimensions: { height: 75, width: 250},
            disabledTint: 0xFF12FF,
            fontSettings: { align: "center", fill: 0x000000, fontSize: 40 },
            mobilePosition: { x: 540, y: 1790 },
            position: {x: 955, y: 800 }
        },
        {
            backgroundColor: 0xFFFFFA,
            borderRadius: 10,
            dimensions: { height: 75, width: 250 },
            disabledTint: 0xFF12FF,
            fontSettings: { align: "center", fill: 0x000000, fontSize: 40 },
            mobilePosition: { x: 870, y: 1790},
            position: { x: 1350, y: 800},
        }
    ]
};

export const mainTaskProps: MainTaskProps = {
    desktopFontSize: 110,
    mobileFontSize: 60,
    textStyleOptions: { align: "center", fill: 0xffffff }
};

export const cardsStackProps: CardsStackProps = {
    cardCount: 144,
    cardSettings: {
        backgroundColor: 0xffffff,
        borders: [ { color: 0xFF33FF, thickness: 3} ],
        dimensions: { height: 450, width: 200} ,
        roundedRadius: 5,
        symbolsMap: [0, 1, 2, 3],
        textStyleOptions: { align: "center", fontSize: 25 },
    },
    cardsStackProps: {
        mobilePosition: { x: 520, y: 1100 },
        offset: { x: 85, y: 85 },
        position: { x: 1200, y: 420},
    },
    initialCardsStackProps: {
        mobilePosition: { x: 450, y: 450},
        offset: { x: 0.2, y: 0.2},
        position: { x: 500, y: 450 },
    },
    loadingTextStyleOptions: { align: "center", fill: 0xFF33FF, fontSize: 50},
    moveInterval: 1,
    timeToMove: 2,
};

export const textAndImagesProps: TextAndImagesProps = {
    componentCount: 3,
    imageChoices: ["{game1}", "{game2}", "{game3}", "{game4}"],
    imageTextStyleOptions: { align: "center", fill: 0xffffff, imagePadding: 5, verticalAlign: "center" },
    textChoices: ["whazzzaaaa", "hello softwgames", "I am in", "for real", "from Mexico", "With Love", "Like your Games", "Danke!", "Again Whazzzaaaa??", "HTML5 Rocks", "For the Win"],
};

export const fireEffectProps: FireEffectProps = {
    fireProps: {
        emitterSettings: {
            addAtBack: false,
            alpha: { end: [0], start: 0.4 },
            blendMode: "normal",
            color: { end: "e5622c", start: "ffd212" },
            emitterLifetime: 0,
            frequency: 0.001,
            lifetime: { max: 2.75, min: 2.25 },
            maxParticles: 3000,
            pos: { x: 0, y: 0 },
            rotationSpeed: { max: 20, min: -20 },
            scale: { end: 2.0, start: 5.0 },
            spawnRect: { h: 0, w: 500, x: 0, y: 0 },
            spawnType: "rect",
            speed: { end: 300, start: 250 },
            startRotation: { max: 275, min: 265},
        },
        particleImages: ["assets/img/particle.png", "assets/img/fire.png"],
    },
    vaporProps: {
        emitterSettings: {
            addAtBack: true,
            alpha: { end: 0.3, start: 0.0 },
            blendMode: "normal",
            color: { end: "100f0c", start: "ffeeee" },
            emitterLifetime: 0,
            frequency: 0.075,
            lifetime: { max: 15.0, min: 10.0 },
            maxParticles: 500,
            pos: { x: 0, y: 0 },
            rotationSpeed: { max: 50, min: 30 },
            scale: { end: 1.5, start: 1.0 },
            spawnRect: { h: 150, w: 450, x: 0, y: 0 },
            spawnType: "rect",
            speed: { end: 140, start: 200 },
            startRotation: { max: 275, min: 235 },
        },
        particleImages: ["assets/img/smoke.png"],
    },
};
