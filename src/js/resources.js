import { ImageSource, Loader, Vector } from 'excalibur';
import Character from '../images/character.png';
import Bullet from '../images/bullet.png';
import Background from '../images/background.jpeg';
import EnemyWalk from '../images/Enemysheets/Skeleton Walk.png';
import EnemyHit from '../images/Enemysheets/Skeleton Hit.png';
import EnemyDeath from '../images/Enemysheets/Skeleton Dead.png';
import PlayerIdle from '../images/PlayerSheet/Gunner_Green_Idle.png';
import oneHeart from '../images/oneHeart.png';
import twoHeart from '../images/twoHearts.png';
import allHearts from '../images/allHearts.png';
import logo from '../images/tower-dower.png';

const Resources = {
    Fish: new ImageSource(Character),
    Bullet: new ImageSource(Bullet),
    Background: new ImageSource(Background),
    Enemy: [
        new ImageSource(EnemyWalk),
        new ImageSource(EnemyHit),
        new ImageSource(EnemyDeath),
        new ImageSource(EnemyHit),
    ],
    Player: [new ImageSource(PlayerIdle)],
    Hearts: [
        new ImageSource(oneHeart),
        new ImageSource(twoHeart),
        new ImageSource(allHearts),
    ],
};
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Bullet,
    Resources.Background,
    Resources.Enemy[0],
    Resources.Enemy[1],
    Resources.Enemy[2],
    Resources.Enemy[3],
    Resources.Player[0],
    Resources.Hearts[0],
    Resources.Hearts[1],
    Resources.Hearts[2],
]);
ResourceLoader.logo = logo;
ResourceLoader.logoWidth = 1300;
ResourceLoader.logoPosition = new Vector(270, 50);
ResourceLoader.logoHeight = 500;
ResourceLoader.backgroundColor = 'grey';
ResourceLoader.playButtonPosition = new Vector(600, 550);

if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId');

    getHighscore(userId).then((highscore) => {
        ResourceLoader.playButtonText = `Start de game\nHighscore: ${highscore}`;
    });
} else {
    ResourceLoader.playButtonText = 'Start de game';
}

async function getHighscore(userId) {
    try {
        const response = await fetch(`/api/getJson.php?id=${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.score;
    } catch (error) {
        console.error(error);
        return 0; // Return a default value in case of error
    }
}








export { Resources, ResourceLoader };
