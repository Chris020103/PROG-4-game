export class VarData {
    coins = 0;
    score = 0;
    enemies = 0;
    lifes = 0;
    incrementCoins(){
        this.coins = this.coins + 1;
    }

    getCoins(){
        return this.coins;
    }

    incrementScore() {
        this.score = this.score + 1;
    }
    getScore(){
        return this.score;
    }

    addEnemy(){
        this.enemies = this.enemies + 1;
    }
    getEnemies(){
        return this.enemies
    }

    removeEnemy(){
        this.enemies = this.enemies - 1;
    }
    setLifes(amount){
        this.lifes = amount
    }
    getLifes(){
        return this.lifes
    }
    removeLife(){
        this.lifes = this.lifes - 1;
    }

    getSavedScore(userID){
        let score;
        fetch(`/api/getJson.php?id=${userID}`)
            .then(promise => promise.json())
            .then((data) => {
                score = data.score
            })
            .catch(error => console.error(error))

        return score;
    }

}