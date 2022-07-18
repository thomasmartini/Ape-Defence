import { Monkey } from './monkey'
import * as PIXI from 'pixi.js'

export class Player extends Monkey{
    xspeed = 0
    yspeed = 0
    constructor(texture: PIXI.Texture){
        super(texture)
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        
    }
    public update(collide: boolean) {
        this.x += this.xspeed
    if(collide){
        this.y += 0
        this.y += this.yspeed
    }else{
        this.y += 5
    }
    } 
    private shoot(){
        console.log("shooooot!")
    }
    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                this.shoot()
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP": 
                this.yspeed = -7
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}
