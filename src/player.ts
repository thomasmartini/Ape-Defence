import { Monkey } from './monkey'
import * as PIXI from 'pixi.js'

export class Player extends Monkey{
    constructor(texture: PIXI.Texture){

        super(texture)
        
        
    }
    public update(collide: boolean) {
    if(collide == true){
        this.y += 0
    }else{
        this.y += 2
    }
    } 
}
