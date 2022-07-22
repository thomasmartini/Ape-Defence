import { Monkey } from "./monkey";
import * as PIXI from 'pixi.js'
import { Game } from "./game";


export class Enemy extends Monkey{
    game:Game
    constructor(texture: PIXI.Texture,game: Game){
        super(texture)
        this.game = game
            this.x = Math.random() * window.screen.width -100
            this.y = 50
    }
    update(collide:boolean){
        console.log(this.game.enemies)
        
        if(collide){
            this.y += 0
            this.x += 3
        }else{
            this.y += 5
        }
        if (this.x >= window.screen.width){
            this.game.removeEnemyFromGame(this)
            console.log("destroy")
        }
    }
}