import {Actor, CollisionType, Vector} from "excalibur";
import {Resources} from "../resources.js";

export class Background extends Actor
{
    constructor() {
        super({pos: new Vector(550, 300), width: 0, height: 0, collisionType: CollisionType.PreventCollision});
        this.graphics.use(
            Resources.Background.toSprite()
        )
        this.scale = new Vector(1.1, 0.8);
    }
}