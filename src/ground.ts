import * as PIXI from 'pixi.js'

export class Ground extends PIXI.Sprite{
    public constructor(texture: PIXI.Texture) {
        super(texture)
        this.width =  window.screen.width
        this.height = 160
        this.y = window.screen.height - this.height
    }
}