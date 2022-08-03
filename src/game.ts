import * as PIXI from 'pixi.js'
import bgImage from "./images/background.jpg"
import monkey from "./images/monkey.png"
import bird from"./images/bird.png"
import ground from "./images/ground.png"
import banana from "./images/banana.png"
import { Player } from './player'
import { Ground } from './ground'
import { Banana } from './banana'
import { Enemy } from './enemy'
import { UI } from './UI'


export class Game {
    pixi: PIXI.Application 
    background:PIXI.Sprite
    loader:PIXI.Loader
    bananas: Banana[] = []
    ground: Ground
    player: Player
    enemies: Enemy[] = []
    collide: boolean
    collideEnemy: boolean
    enemyTimer: number = 0
    interface: UI 
 

    public constructor() {
        
        this.pixi = new PIXI.Application({ resizeTo: window })
        document.body.appendChild(this.pixi.view)
        this.collide = false
      
        this.loader = new PIXI.Loader()
        this.loader
        .add("backgroundTexture", bgImage)
        .add("monkeyTexture", monkey)
        .add("groundTexture", ground)
        .add("bananaTexture", banana)
        .add("birdTexture", bird)

        this.loader.load(() => this.doneLoading())
    }

    private doneLoading(){
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.background.width = window.screen.width
        this.background.height = window.screen.height
        this.pixi.stage.addChild(this.background)

        this.player = new Player(this.loader.resources["monkeyTexture"].texture!, this)
        this.pixi.stage.addChild(this.player)

        this.ground = new Ground(this.loader.resources["groundTexture"].texture!)
        this.pixi.stage.addChild(this.ground)

        this.interface = new UI()
        this.pixi.stage.addChild(this.interface)
        this.pixi.ticker.add(() => this.update())

    }
    
    private update() {
        this.player.update(this.collide)
        for(let enemy of this.enemies){         
             if(this.collision(this.ground, enemy)){
                this.collideEnemy = true
            }else{
                this.collideEnemy = false
            }
            enemy.update()
        }
        if(this.collision(this.ground, this.player)){
            this.collide = true
        }else{
            this.collide = false
        }
        for(let banana of this.bananas){
            banana.update()
        }
        this.enemyTimer += 1
        if(this.enemyTimer >= 300){
            this.spawnEnemy()
            this.enemyTimer = 0
        }
        this.checkCollisions()
    }
         private checkCollisions() {
            for (let banana of this.bananas) {
                for (let enemy of this.enemies) {
                    if(this.collision(banana, enemy)){
                        this.removeEnemyFromGame(enemy)
                        this.removeBananaFromGame(banana)
                        this.interface.addScore(10)
                        break
                    }
                }
            }
        }

public spawnBanana(x:number, y:number){
    let banana = new Banana(this.loader.resources["bananaTexture"].texture!,this, x, y)
    this.bananas.push(banana)
    this.pixi.stage.addChild(banana)
}
public removeBananaFromGame(banana:Banana) {
    this.bananas = this.bananas.filter(f => f != banana)
    banana.destroy()
}
public removeEnemyFromGame(enemy:Enemy) {
    this.enemies = this.enemies.filter(f => f != enemy)
    enemy.destroy()
}
private spawnEnemy(){
    let enemy = new Enemy(this.loader.resources["birdTexture"].texture!,this)
    this.enemies.push(enemy)
    this.pixi.stage.addChild(enemy)
}
private collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
    const bounds1 = sprite1.getBounds()
    const bounds2 = sprite2.getBounds()

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}
}
new Game()