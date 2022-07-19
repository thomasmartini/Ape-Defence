import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Player } from './player'

export class Banana extends PIXI.Sprite{
    game:Game
   
    constructor(texture: PIXI.Texture,game: Game, x:number, y: number){
        super(texture)
        this.game = game
            this.width = 50
            this.height = 30
            this.x = x
            this.y = y + 50

    }
    update(){
        this.x += -4
        if(this.x < 0){
            this.game.removeBananaFromGame(this)
        }
    }
}