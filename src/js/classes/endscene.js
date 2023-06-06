import * as ex from "excalibur";
import { VarData } from "./varData.js";

export class Endscene extends ex.Scene {
    game;
    _loaded = false;
    restartLabel;
    highscoreLabel;
    varData;
    userId;
    highscore;

    constructor(gameInstance) {
        super(gameInstance);
        this.varData = gameInstance.varData;
        this.game = gameInstance;
        if (localStorage.getItem('userId')) {
            this.userId = localStorage.getItem('userId');
        }
    }

    onInitialize(engine) {
        engine.start().then(() => {
            this._loaded = true;
        });

        if (localStorage.getItem('userId')) {
            this.userId = localStorage.getItem('userId');
            this.getHighscore(this.userId);

        } else {
            this.highscore = this.varData.getScore();
            this.displayHighscore();
            const userId = Math.random().toString(36);
            localStorage.setItem('userId', userId)
            this.saveScore(userId);
        }

        this.restartLabel = new ex.Label({
            text: "GAME OVER!\nKlik op enter om opnieuw te beginnen",
            color: ex.Color.White,
            pos: new ex.Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            textAlign: ex.TextAlign.Center
        });

        this.add(this.restartLabel);
    }

    onActivate() {
    }

    getHighscore(userId) {
        fetch(`/api/getJson.php?id=${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if(data.score < this.varData.getScore()) {
                    this.saveScore(userId);
                    this.highscore = this.varData.getScore();
                }else{
                    this.highscore = data.score;
                }
                this.displayHighscore();
            })
            .catch(error => console.error(error));
    }

    displayHighscore() {
        this.highscoreLabel = new ex.Label({
            text: `Highscore: ${this.highscore}`,
            color: ex.Color.White,
            pos: new ex.Vector(500, 40),
            textAlign: ex.TextAlign.Center
        });

        this.add(this.highscoreLabel);
    }

    saveScore = (userId) => {
        fetch(`/api/saveJson.php?id=${userId}&score=${this.varData.getScore()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.log(error));
    };

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Enter)) {
            location.reload();
        }
    }
}
