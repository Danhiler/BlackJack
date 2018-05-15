const Player = require('./player');
const {Pack} = require('./pack');


class Room {
    constructor(name) {
        this.name = name;
        this.players = [];
        this.turn = 1;

        this.players.push(new Player('Dealer',21))

    }
    nextTurn(){
        this.turn =(this.turn<=this.players.length)?this.turn+1:1;
    }

    getPlayers() {
        return this.players;
    }

    getPlayerByName(name) {
        const player = this.players.find((player) => {
           return player.name === name;
        });

        return player || null;
    }

    getRoomScore() {
        return this.players.reduce((score, player) => {
            return score + player.score;
        }, 0);
    }

    addUniquePlayer(name) {
        if (this.getPlayerByName(name)) {
            return false;
        }

        this.players.push(new Player(name));

        return true;
    }

    newGame() {
        var pack = Pack();
        this.players.map((player) => player.cards.push(pack.popCard()));
        this.players.map((player) => {
            if (player.name !== 'Dealer')
                player.cards.push(pack.popCard())

        });
        this.updateScore();
    }
    updateScore() {
    this.players.map(user=> {
        var score=0;
         user.cards.map((card)=>{
            switch (card.num){
                case 13: score+= 10; break;
                case 12: score+= 10; break;
                case 11: score+= 10; break;
                case 1:
                    score+= (score>10)? 1:11; break;
                default: score+= card.num; break;
            }
        });
        user.score =score
    })
    }
    init(){

        //document.getElementById("opp").value +=
        //   ""+parseInt(Math.random() * 13+1)
        //initPlayers()
        //paintUserTurn()
       // check_lost()

    }

    check_lost() {
        you = document.getElementById("you")
            .value.split(',')
            .reduce((a, b) => +a + +b, 0);
        opp = document.getElementById("opp")
            .value.split(',')
            .reduce((a, b) => +a + +b, 0);

        document.getElementById("score").value  = you+" : "+opp;


        if(you>21) {
            document.getElementById("you").value += " - You Lost"
        } else if (opp>21) {

            document.getElementById("opp").value += " - You Lost"
        }
    }

}


var room1 = new Room('room1');
room1.newGame();

module.exports = Room;