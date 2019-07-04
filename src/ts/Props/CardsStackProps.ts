import { TextStyleOptions } from "pixi.js";
import { utils } from "pixi.js";
import { desktopRect, mobileRect } from "../config";


// tslint:disable-next-line: interface-name
export interface CardsStackProps {
    cardCount: number;
    cardSettings: ImagesCardsProps;
    initialCardsStackProps: StackProps;
    loadingTextStyleOptions: TextStyleOptions;
    cardsStackProps: StackProps;
    moveInterval: number;
    timeToMove: number;
}

// tslint:disable-next-line: interface-name
export interface ButtonProps {
    dimensions: {
        width: number;
        height: number;
    };
    fontSettings: TextStyleOptions;
    backgroundColor: number;
    disabledTint: number;
    borderRadius: number;
    mobilePosition: Point;
    position: Point;
}

// tslint:disable-next-line: interface-name
export interface FireEffectProps {
    fireProps: {
        emitterSettings: any; 
        particleImages: string[];
    };
    vaporProps: {
        emitterSettings: any; 
        particleImages: string[];
    };
}

// tslint:disable-next-line: interface-name
export interface FPSProps {
    position: Point;
    textStyleOptions: TextStyleOptions;
    updateFrequency: number;
}


// tslint:disable-next-line: interface-name
export interface ImageAndTextProps extends TextStyleOptions {
    imagePadding?: number;
    verticalAlign?: "center" | "bottom" | "top";
}

// tslint:disable-next-line: interface-name
export interface ImagesCardsProps {
    backgroundColor: number;
    borders: Array<{color: number; thickness: number}>;
    dimensions: RectangleDimensions;
    roundedRadius: number;
    symbolsMap: number[];
    textStyleOptions: TextStyleOptions;
}

// tslint:disable-next-line: interface-name
export interface MainTaskProps {
    desktopFontSize: number;
    mobileFontSize: number;
    textStyleOptions: TextStyleOptions;
}

// tslint:disable-next-line: interface-name
export interface MenuProps {
    buttonSettings: SubButtonProps[];
}

// tslint:disable-next-line: interface-name
export interface Point {
    x: number;
    y: number;
}

// tslint:disable-next-line: interface-name
export interface RectangleDimensions {
    width: number;
    height: number;
}

// tslint:disable-next-line: interface-name
export interface StackProps {
    mobilePosition: Point;
    offset: Point;
    position: Point;
}

// tslint:disable-next-line: interface-name
export interface SubButtonProps extends ButtonProps {
    children?: ButtonProps[];
}

// tslint:disable-next-line: interface-name
export interface TextAndImagesProps {
    componentCount: number;
    imageChoices: string[];
    imageTextStyleOptions: ImageAndTextProps;
    textChoices: string[];
}


export function getRandom() {
    return  (Math.random() - 0.5) * 2.0;
}

export function defaultParams(query: string, defaultResult: string): string {
    try {
        return new URLSearchParams(document.location.search).get(query) || defaultResult;
    } catch (e) {
        return defaultResult;
    }
}

export const inMobile = isInMobile();

export function isInMobile(): boolean {
    return defaultParams("mobile", "false") === "yeah" ? true : utils.isMobile.any;
}

export function getScreenRect() {
    return inMobile ? mobileRect : desktopRect;
}






