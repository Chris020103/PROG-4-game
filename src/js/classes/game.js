import '../../css/style.css'
import * as ex from "excalibur"
import { ResourceLoader } from '../resources.js'
import { Character } from "./character.js";
import { DevTool } from "@excaliburjs/dev-tools";
import { Background } from "./background.js";
import { Enemy } from "./enemy.js";
import { Label } from "./label.js";
import { CoinLabel } from "./coinLabel.js";
import { VarData } from "./varData.js";
import { Score } from "./score.js";
import {LifesLabel} from "./lifesLabel.js";
import {Endscene} from "./endscene.js";
import {Startscene} from "./startScene.js";
export class Game extends ex.Engine {
    amountEnemies = 3;
    wave = 1;
    spawnedEnemies = 0;
    varData = new VarData();
    coinLabel = new CoinLabel();
    score = new Score();
    _label = new Label();
    waveStarted = false;
    lifes = new LifesLabel(this.varData);
    gameoverScene = null;

    constructor() {
        super({ width: 800, height: 600, displayMode: ex.DisplayMode.FitScreenAndFill })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true)
        this.debug.transform.showAll = true

        this.startScene = new Startscene(this);
        this.add('start', this.startScene);
        this.goToScene('start'); // start with the start scene

        this.gameoverScene = new Endscene(this);
        this.add('gameover', this.gameoverScene);

        // create an instance of your main scene and add it to the game engine
        this.mainScene = new MainScene(this);
        this.add('main', this.mainScene);
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
        this.onLabelChange();
    }

    startGame() {
        this.goToScene('main');


        const background = new Background();
        this.add(background);

        const character = new Character(128, 100)
        this.add(character)
        const timer = new ex.Timer({
            repeats: true,
            interval: 10,
        })
        this.add(timer);
        this.varData.setLifes(3);

        this.label.text = 'Wave 1';
        this.add(this.label);
        this.add(this.score);
        this.add(this.coinLabel);
        this.add(this.lifes);
    }

    startWave() {
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
        }

        this.spawnedEnemies = 0;
        this.waveStarted = true;
        this.label.text = `Wave ${this.wave}`;

        // add a delay before starting the wave
        setTimeout(() => {
            this.spawnInterval = setInterval(() => {
                if (this.spawnedEnemies !== this.amountEnemies * this.wave) {
                    this.varData.addEnemy();
                    const enemy = new Enemy(this.varData);
                    this.add(enemy);
                    this.spawnedEnemies++;
                } else {
                    clearInterval(this.spawnInterval);
                    this.spawnInterval = null;
                    this.waveStarted = false;
                    this.wave++;
                }
            }, 800);
        }, 2000); // delay for 2 seconds
    }

    onPreUpdate(_engine, _delta) {
        this.score.text = `Score: ${this.varData.getScore()}`
        this.coinLabel.text = this.varData.getCoins().toString();

        if (!this.waveStarted && !this.spawnInterval && this.varData.getEnemies() === 0) {
            this.startWave();
        }
        if(this.varData.getLifes() <= 0){
            this.goToScene('gameover');
        }
    }
    onLabelChange() {
        this.startWave();
    }
}

new DevTool(new Game())
