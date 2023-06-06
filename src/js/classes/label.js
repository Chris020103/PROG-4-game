import * as ex from "excalibur";
export class Label extends ex.Label
{
    constructor(text) {
        super(
            {
                text: text,
                pos: ex.vec(200, 70),
                font: new ex.Font({
                    family: 'impact',
                    size: 72,
                    unit: ex.FontUnit.Px
                })
            }
        );
    }
}