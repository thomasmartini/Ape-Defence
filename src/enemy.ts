import { Monkey } from "./monkey";
import * as PIXI from 'pixi.js'
import { Game } from "./game";


export class Enemy extends Monkey{
    game:Game
    public constructor(texture: PIXI.Texture, game: Game){
        super(texture)
        this.game = game
            this.x = Math.random() * window.screen.width -100
            this.y = -60
    }
    public update(){
            this.y += 3       
        if (this.y >= window.screen.height){
            this.game.removeEnemyFromGame(this)
        }
    }
}