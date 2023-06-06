import * as ex from "excalibur";
export class CoinLabel extends ex.Label
{
    constructor() {
        super(
            {
                text: ``,
                pos: ex.vec(110, 445),
                font: new ex.Font({
                    family: 'impact',
                    size: 52,
                    unit: ex.FontUnit.Px
                })
            }
        );
    }
}