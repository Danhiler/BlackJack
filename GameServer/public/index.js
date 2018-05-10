$(function () {
    // var opp,you, turn = 1;
    // var skip = function () {
    //     turn =1-turn
    //     paintUserTurn()
    //}
function printCards(cards){
    var str = '';
    cards.map((card)=>{
        switch(card.num){
            case 13:
                str+='K ';
                break;
            case 12:
                str+='Q ';
                break;
            case 11:
                str+='J ';
                break;
            case 1:
                str+='A ';
                break;
            default:
                str+=card.num+' ';

        }
    })
    return str;
}
    function newGame() {
        var roomId = 'asd';
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/room/" + roomId + "/newgame/",
            success: function (room) {
                console.log("Done: " + room);
                $("#players li").remove();
                for (var user of room.players) {
                    if (user.isAlive)
                        var str = "<li class='player'>" + user.name + " : " + user.score +
                            "<textarea id='" + user.name + "'>" +
                            printCards(user.cards) + "</textarea></li>";
                    $("#players").append(str)

                }
            },
            error: function (e) {
                console.log("Error", e.responseText);
            }
        });
    }


    var another = function () {
        if (turn === 1) {

            document.getElementById("you").value +=
                "," + parseInt(Math.random() * 13 + 1);

            skip();
        }
        else if (turn === 0) {


            document.getElementById("opp").value +=
                "," + parseInt(Math.random() * 13 + 1);

            skip()
        }

        check_lost()


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


    var addNewUser = function () {
        var roomId = 'asd';
        var userId = $('#userName').val();
        var Ulplayers = $("#players")

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/room/" + roomId + "/players/" + userId,
            success: function (room) {
                $("#players li").remove();

                for (var user of room.players) {
                    if (user.isAlive)
                        var str = "<li class='player'>" + user.name + " : " + user.score +
                            "<textarea id='" + user.name + "'></textarea></li>";
                    $("#players").append(str)
                }
            },
            error: function (e) {
                console.log("Error", e.responseText);
            }
        });
    }
    var initPlayers = () => {
        var roomId = 'asd';
        var userId = $('#userName').val();
        var Ulplayers = $("#players")

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/room/" + roomId,
            success: function (room) {
                $("#players li").remove();
                if(room.players)
                for (var user of room.players) {
                    if (user.isAlive)
                        var str = "<li class='player'>" + user.name + " : " + user.score +
                            "<textarea id='" + user.name + "'></textarea></li>";
                    $("#players").append(str)
                }
            },
            error: function (e) {
                console.log("Error", e.responseText);
            }
        });
    }


    $(document).ready(initPlayers);
    // $("#b1").click(another);
    // $("#b2").click(skip);
    $("#b3").click(newGame);
    $("#addUser").click(addNewUser)

});




