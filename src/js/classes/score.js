import * as ex from "excalibur";

export class Score extends ex.Label{
    constructor() {
        super(
            {
                text: ``,
                pos: ex.vec(600, 40),
                font: new ex.Font({
                    family: 'impact',
                    size: 52,
                    unit: ex.FontUnit.Px
                })
            }
        );
    }
}