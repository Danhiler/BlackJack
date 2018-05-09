$(function () {
    var opp,you, turn = 1;
    var skip = function () {
        turn =1-turn
        paintUserTurn()
    }
    var another =function () {
        if(turn === 1){

            document.getElementById("you").value +=
                ","+parseInt(Math.random() * 13+1);

            skip();
        }
        else if(turn === 0) {


            document.getElementById("opp").value +=
                "," + parseInt(Math.random() * 13 + 1);

            skip()
        }

        check_lost()


    }
    var newGame = function() {

        $("dealer").val(" ")
        init();


    }
    function check_lost() {
        // you = document.getElementById("you")
        //     .value.split(',')
        //     .reduce((a, b) => +a + +b, 0);
        // opp = document.getElementById("opp")
        //     .value.split(',')
        //     .reduce((a, b) => +a + +b, 0);
        //
        // document.getElementById("score").value  = you+" : "+opp;
        //
        //
        // if(you>21) {
        //     document.getElementById("you").value += " - You Lost"
        // } else if (opp>21) {
        //
        //     document.getElementById("opp").value += " - You Lost"
        // }
    }

    function paintUserTurn() {
        // if(turn ===1) {
        //     document.getElementById("you").style.backgroundColor ="lightblue";
        //     document.getElementById("opp").style.backgroundColor ='';
        // }
        // else {
        //     document.getElementById("you").style.backgroundColor ="";
        //     document.getElementById("opp").style.backgroundColor ='lightblue';
        // }



    }


    var init = function (){


        //document.getElementById("opp").value +=
         //   ""+parseInt(Math.random() * 13+1)
        initPlayers()
        paintUserTurn()
        check_lost()

    }

    var initPlayers = function () {
        var roomId = 'asd';
        var userId = $('#userName').val();
        var score = $('#score');

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/room/" + roomId ,//room/:roomId/players/:userId/score
            success: function (room) {
                console.log("Done: " + room);
                for (var user of room.players) {
                    if(user.isAlive)
                        var str = "<li class='player'>" + user.name + " : " + user.score +
                            "<textarea id='"+user.name+"'></textarea></li>";
                    $("#players").append(str)
                    score.attr('value', user.maxScore);
                }
            },
            error: function () {
                console.log("Error");
            }
        });
    }


    $(document).ready(init);
    $("#b1").click(another);
    $("#b2").click(skip);
    $("#b3").click(newGame);

})




