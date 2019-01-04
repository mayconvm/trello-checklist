class List
{
    constructor(name, idBoard) {
        this.name = name;
        this.idBoard = idBoard;
        this.card = [];
    }

    getName() {
        return this.name;
    }

    getIdBoard() {
        return this.name;
    }

    setCard(card) {
        this.card.push($card);
    }

    getCard() {
        return this.card;
    }

    getDate() {
        return {
            "name": this.getName(),
            "idBoard": this.getIdBoard(),
            "pos": "top"
        }
    }
}