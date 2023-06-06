import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import Character from '../images/character.png';
import Bullet from '../images/bullet.png'
import Background from "../images/background.jpeg";
import EnemyWalk from "../images/Enemysheets/Skeleton Walk.png";
import EnemyHit from "../images/Enemysheets/Skeleton Hit.png";
import EnemyDeath from "../images/Enemysheets/Skeleton Dead.png";
import PlayerIdle from "../images/PlayerSheet/Gunner_Green_Idle.png"
import oneHeart from '../images/oneHeart.png'
import twoHeart from '../images/twoHearts.png'
import allHearts from '../images/allHearts.png'
const Resources = {
    Fish: new ImageSource(Character),
    Bullet: new ImageSource(Bullet),
    Background: new ImageSource(Background),
    Enemy: [new ImageSource(EnemyWalk), new ImageSource(EnemyHit), new ImageSource(EnemyDeath), new ImageSource(EnemyHit)],
    Player: [new ImageSource(PlayerIdle)],
    Hearts: [new ImageSource(oneHeart), new ImageSource(twoHeart), new ImageSource(allHearts)]
}
const ResourceLoader = new Loader([Resources.Fish, Resources.Bullet, Resources.Background, Resources.Enemy[0], Resources.Enemy[1], Resources.Enemy[2], Resources.Enemy[3], Resources.Player[0], Resources.Hearts[0], Resources.Hearts[1], Resources.Hearts[2]])

export { Resources, ResourceLoader }