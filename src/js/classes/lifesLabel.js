import * as ex from 'excalibur';
import {Resources} from "../resources.js";
import {VarData} from "./varData.js";
export class LifesLabel extends ex.Actor
{
    heartAnimations = []
    varData;
    constructor(varData) {
        super({
            width: Resources.Hearts.width,
            height: Resources.Hearts.height,
            collisionType: ex.CollisionType.Passive
        });
        this.varData = varData;
        this.pos = ex.vec(1000, 200)
        this.scale = ex.vec(2, 2)
    }
    onInitialize(_engine) {
        let allHeartsSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.Hearts[2],
            grid:{
                rows: 1,
                columns: 1,
                spriteWidth: 33,
                spriteHeight: 10
            }
        })
        let twoHearts = ex.SpriteSheet.fromImageSource({
            image: Resources.Hearts[1],
            grid:{
                rows: 1,
                columns: 1,
                spriteWidth: 33,
                spriteHeight: 10
            }
        })
        let oneHeart = ex.SpriteSheet.fromImageSource({
            image: Resources.Hearts[0],
            grid:{
                rows: 1,
                columns: 1,
                spriteWidth: 33,
                spriteHeight: 10
            }
        })
        this.heartAnimations['allHearts'] = ex.Animation.fromSpriteSheet(allHeartsSheet, ex.range(0,1), 50)
        this.heartAnimations['twoHearts'] = ex.Animation.fromSpriteSheet(twoHearts, ex.range(0,1), 1000)
        this.heartAnimations['oneHeart'] = ex.Animation.fromSpriteSheet(oneHeart, ex.range(0,1), 50)
        this.graphics.use(this.heartAnimations['allHearts']);
    }
    onPreUpdate(_engine, _delta) {
        if(this.varData.getLifes() === 2){
            this.graphics.use(this.heartAnimations['twoHearts']);
        }else if (this.varData.getLifes() === 1){
            this.graphics.use(this.heartAnimations['oneHeart']);
        }
    }
}
