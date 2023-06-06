import * as ex from "excalibur";

export class Endscene extends ex.Scene {
    game;
    _loaded = false;
    restartLabel;

    constructor(gameInstance) {
        super(gameInstance);
        this.game = gameInstance;
    }

    onInitialize(engine) {
        engine.start().then(() => {
            this._loaded = true;
        });

        this.restartLabel = new ex.Label({
            text: "Press Enter to restart",
            color: ex.Color.White,
            pos: new ex.Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            textAlign: ex.TextAlign.Center
        });

        this.add(this.restartLabel);
    }

    onActivate() {
        console.log('Game over!');
    }


    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Enter)) {
            location.reload();
        }
    }
}
