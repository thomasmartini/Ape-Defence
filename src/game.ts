import * as PIXI from 'pixi.js'
import bgImage from "./images/background.jpg"
import Monkeys from "./images/monkey.png"
import ground from "./images/ground.png"
import banana from "./images/banana.png"
import { Player } from './player'
import { Ground } from './ground'
import { Banana } from './banana'


export class Game {
    pixi: PIXI.Application 
    background:PIXI.Sprite
    loader:PIXI.Loader
    bananas: Banana[] = []
    grounds: Ground[] = []
    players: Player[] = []
    collide: boolean
 

    public constructor() {
        
        this.pixi = new PIXI.Application({ resizeTo: window })
        document.body.appendChild(this.pixi.view)
        this.collide = false
      
    
        this.loader = new PIXI.Loader()
        this.loader
        .add("backgroundTexture", bgImage)
        .add("monkeyTexture", Monkeys)
        .add("groundTexture", ground)
        .add("bananaTexture", banana)

        this.loader.load(() => this.doneLoading())
    }

    private doneLoading(){
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.background.width = window.screen.width
        this.background.height = window.screen.height
        this.pixi.stage.addChild(this.background)
        let player = new Player(this.loader.resources["monkeyTexture"].texture!, this)
        this.players.push(player)
        this.pixi.stage.addChild(player)
        let ground = new Ground(this.loader.resources["groundTexture"].texture!)
        this.grounds.push(ground)
        this.pixi.stage.addChild(ground)
       this.pixi.ticker.add(() => this.update())
    }
    
    public spawnBanana(x:number, y:number){
          let banana = new Banana(this.loader.resources["bananaTexture"].texture!,this, x, y)
          this.bananas.push(banana)
          this.pixi.stage.addChild(banana)
    }
    

    private update() {
        this.players[0].update(this.collide)
        if(this.collision(this.grounds[0], this.players[0])){
            this.collide = true
        }else{
            this.collide = false
        }
        for(let banana of this.bananas){
            banana.update()
        }
}
removeBananaFromGame(banana:Banana) {
    this.bananas = this.bananas.filter(f => f != banana)
    banana.destroy()
}
collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
    const bounds1 = sprite1.getBounds()
    const bounds2 = sprite2.getBounds()

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

}
new Game()