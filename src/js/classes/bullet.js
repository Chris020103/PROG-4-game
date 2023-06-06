import * as ex from "excalibur";
import {Resources} from "../resources.js";

export class Bullet extends ex.Actor {
    constructor(posX, posY, rotation) {
        super({
            x: posX,
            y: posY,
            vel: rotation.scale(1000),
            name: 'bullet',
            collider: ex.Shape.Box(10, 10),
            collisionType: ex.CollisionType.Passive
        });
        this.graphics.use(Resources.Bullet.toSprite());
        this.scale = ex.vec(0.1, 0.1)
       this.body.collisionType = ex.CollisionType.Passive;
    }
    onInitialize(_engine) {
        this.on('exitviewport', () => this.kill());
    }
}
