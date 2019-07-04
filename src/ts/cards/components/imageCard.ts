import { CanvasRenderer, Container, Graphics, RenderTexture, Sprite, Text, TextStyleOptions, Texture, WebGLRenderer } from "pixi.js";
import { images, cardsStackProps, fontProps } from "../../config";

export class ImageCard extends Sprite {
    constructor(index: number, renderer: WebGLRenderer | CanvasRenderer) {
        super();
        this.texture = this.renderTexture(index, renderer);
    }

    private renderTexture(index: number, renderer: WebGLRenderer | CanvasRenderer): Texture {
        const dimensions = cardsStackProps.cardSettings.dimensions;
        const totalBorderThickness = cardsStackProps.cardSettings.borders.map((border) => border.thickness).reduce((last, current) => last + current);
        const maxWidth = dimensions.width + totalBorderThickness * 2;
        const maxHeight = dimensions.height + totalBorderThickness * 2;
        const renderTexture = RenderTexture.create(maxWidth, maxHeight);
        const graphics = new Graphics();

        let currentOffset = 0;
        cardsStackProps.cardSettings.borders.forEach((borderSettings) => {
            graphics.beginFill(borderSettings.color);
            const w = dimensions.width + (totalBorderThickness - currentOffset) * 2;
            const h = dimensions.height + (totalBorderThickness - currentOffset) * 2;
            const radius = cardsStackProps.cardSettings.roundedRadius + (totalBorderThickness - currentOffset);
            graphics.drawRoundedRect(currentOffset, currentOffset, w, h, radius);
            graphics.endFill();
            currentOffset += borderSettings.thickness;
        });

        graphics.beginFill(cardsStackProps.cardSettings.backgroundColor);
        graphics.drawRoundedRect(currentOffset, currentOffset, dimensions.width, dimensions.height, cardsStackProps.cardSettings.roundedRadius);
        graphics.endFill();

        const symbolIndex = Math.floor(Math.random() * cardsStackProps.cardSettings.symbolsMap.length);
        const frameId = images[cardsStackProps.cardSettings.symbolsMap[symbolIndex]];

        const topImage = Sprite.fromFrame(frameId);
        topImage.scale.set(0.5);
        topImage.position.set(currentOffset + 10, currentOffset + 10);

        const label = this.renderLabel(index.toString());
        label.position.set(dimensions.width / 2 + currentOffset, dimensions.height / 2 + currentOffset);

        const bottomImage = Sprite.fromFrame(frameId);
        bottomImage.anchor.set(1, 1);
        bottomImage.position.set(dimensions.width + currentOffset - 10, dimensions.height + currentOffset - 10);
        bottomImage.scale.set(0.5);
        const container = new Container();
        container.addChild(graphics);
        container.addChild(topImage);
        container.addChild(bottomImage);
        container.addChild(label);
        renderer.render(container, renderTexture);
        return renderTexture;
    }

    private renderLabel(index: string ) {
        const label = new Text(index, Object.assign({}, fontProps, cardsStackProps.cardSettings.textStyleOptions));
        label.anchor.set(0.5, 0.5);
        return label;
    }
}
