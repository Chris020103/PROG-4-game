import * as ex from "excalibur";
import {Resources} from "../resources.js";

export class Enemy extends ex.Actor{
    varData;
    isHit = false;
    enemyAnimations = [];
    lifes = 2;
    constructor(varData) {
        super({
            width: Resources.Enemy.width,
            height: Resources.Enemy.height,
            collider: ex.Shape.Box(32, 32),
            collisionType: ex.CollisionType.Passive
            }
        );
        this.varData = varData;
        const speed = 100
        this.actions.moveTo(new ex.Vector(60, 28), speed)
            .moveTo(new ex.Vector(60, 150), speed)
            .moveTo(new ex.Vector(110, 150), speed)
            .moveTo(new ex.Vector(110, 300), speed)
            .moveTo(new ex.Vector(200, 300), speed)
            .moveTo(new ex.Vector(200, 370), speed)
            .moveTo(new ex.Vector(430, 370), speed)
            .moveTo(new ex.Vector(430, 250), speed)
            .moveTo(new ex.Vector(320, 250), speed)
            .moveTo(new ex.Vector(320, 130), speed)
            .moveTo(new ex.Vector(430, 130), speed)
            .moveTo(new ex.Vector(430, 55), speed)
            .moveTo(new ex.Vector(675, 55), speed)
            .moveTo(new ex.Vector(675, 170), speed)
            .moveTo(new ex.Vector(760, 170), speed)
            .moveTo(new ex.Vector(760, 270), speed)
            .moveTo(new ex.Vector(650, 270), speed)
            .moveTo(new ex.Vector(650, 330), speed)
            .moveTo(new ex.Vector(930, 330), speed)
            .moveTo(new ex.Vector(930, 150), speed)
            .moveTo(new ex.Vector(1200, 150), speed)
        this.pos = new ex.Vector(20, 28);
        this.scale = new ex.Vector(1,1);
    
    }
    onInitialize(_engine) {
        let enemyWalkSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.Enemy[0],
            grid: {
                rows: 1,
                columns: 13,
                spriteHeight: 33,
                spriteWidth: 22
            }
        })
        let enemyDeathSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.Enemy[2],
            grid: {
                rows: 1,
                columns: 15,
                spriteHeight: 32,
                spriteWidth: 33
            }
        })
        let enemyHit = ex.SpriteSheet.fromImageSource({
            image: Resources.Enemy[3],
            grid:{
                rows: 1,
                columns: 8,
                spriteHeight: 32,
                spriteWidth: 30,
            }
        })
        this.enemyAnimations['hitAnimation'] = ex.Animation.fromSpriteSheet(enemyHit, ex.range(0,7), 50);
        this.enemyAnimations['walkAnimation'] = ex.Animation.fromSpriteSheet(enemyWalkSheet, ex.range(0,12), 50)
        this.enemyAnimations['deathAnimation'] = ex.Animation.fromSpriteSheet(enemyDeathSheet, ex.range(0,14), 50, ex.AnimationStrategy.Freeze)
        this.graphics.use(this.enemyAnimations['walkAnimation']);


    }

    onPreUpdate(_engine, _delta) {
        if(this.isOffScreen){
            this.kill();
            this.varData.removeEnemy();
            this.varData.removeLife();
        }
        this.on('collisionstart', (event) => {
            if(this.isHit) return;

            if(event.other._name === 'bullet'){
                this.isHit = true;
                if(this.lifes === 2){
                    this.lifes--;
                    this.graphics.use(this.enemyAnimations['hitAnimation'])

                    setTimeout(() => {
                        this.graphics.use(this.enemyAnimations['walkAnimation']);
                        this.isHit = false;
                    }, 300)
                }else{
                    this.graphics.use(this.enemyAnimations['deathAnimation']);
                    this.varData.incrementCoins();
                    this.varData.incrementScore();

                    this.varData.removeEnemy();

                    this.actions.clearActions();
                    setTimeout(() => {
                        this.kill();
                    }, 1000)
                }
            }
        })
    }
}