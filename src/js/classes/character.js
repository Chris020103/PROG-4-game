import * as ex from "excalibur";
import {Resources} from "../resources.js";
import {Bullet} from "./bullet.js";

export class Character extends ex.Actor{
    positionX
    positionY
    playerAnminations = []
    constructor(posX, posY) {
        let rotation = 0;
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height,
            rotation: rotation,
            collisionType: ex.CollisionType.PreventCollision
        });
        this.positionX = posX;
        this.positionY = posY
        this.pos = new ex.Vector(posX, posY);

    }
    onInitialize(_engine) {
        let PlayerIdleSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.Player[0],
            grid:{
                rows: 1,
                columns: 5,
                spriteHeight: 48,
                spriteWidth:  48
            }
        })
        this.playerAnminations['playerIdleAnimation'] = ex.Animation.fromSpriteSheet(PlayerIdleSheet, ex.range(0,4), 50);
        this.graphics.use(this.playerAnminations['playerIdleAnimation'])
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.isHeld(ex.Input.Keys.A) || engine.input.keyboard.isHeld(ex.Input.Keys.Left))
        {
           this.rotation = this.rotation + -0.1
        }
        if (engine.input.keyboard.isHeld(ex.Input.Keys.D) || engine.input.keyboard.isHeld(ex.Input.Keys.Right))
        {
            this.rotation = this.rotation + 0.1;
        }
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.Space)){
            this.addBullet(engine)
        }
    }
    addBullet(engine){
        engine.add(new Bullet( this.positionX , this.positionY, ex.vec(Math.cos(this.rotation), Math.sin(this.rotation)).normalize()))
    }

}

