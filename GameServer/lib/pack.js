function Pack() {
var pack= {
        cards : getPack(),
        popCard : popCard
    }
    function getPack() {
        var pack =[];
        for (var i =1; i <= 13; i++)
            for(var j=1; j <=4;j++)
                pack.push(Card(i,j))

        pack = shuffleDeck(pack,getRandomInt(40, 50))
        return pack
    }

    function popCard() {
    return pack.cards.pop();
    }

    function shuffleDeck(cards, shuffleCnt) {
        for(var i = 0; i < shuffleCnt; i++) {
            var rndNo = getRandomInt(1, 52);
            var card = cards[i];
            cards[i] = cards[rndNo-1];
            cards[rndNo] = card;
        }
        return cards
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Card(num,suite) {
        return {
            num:num,
            suite:suite
        }
    }

return pack;

}
exports.Pack = Pack;
//module.exports = Pack;