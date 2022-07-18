import * as PIXI from 'pixi.js'
import { Ground } from './ground'

export class Monkey extends PIXI.Sprite{
collide: boolean
ground : Ground
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.width =  200
        this.height = 160
        this.collide = false
       
    }

}
