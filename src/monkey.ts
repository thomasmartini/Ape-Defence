import * as PIXI from 'pixi.js'


export class Monkey extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.width =  200
        this.height = 160
    }

}
