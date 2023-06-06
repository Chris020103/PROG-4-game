import * as ex from "excalibur";

export class Startscene extends ex.Scene {
    game;

    startLabel;

    constructor(gameInstance) {
        super(gameInstance);
        this.game = gameInstance;
    }

    onInitialize(engine) {
        this.startLabel = new ex.Label({
            text: "Press Enter to start",
            color: ex.Color.White,
            pos: new ex.Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            textAlign: ex.TextAlign.Center
        });

        this.add(this.startLabel);
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Enter)) {
            // switch to main game scene when Enter is pressed
            this.game.goToScene('main');
        }
    }
}
