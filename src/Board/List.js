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

    setIdBoard(value) {
        this.idBoard = value;
    }

    getIdBoard() {
        return this.idBoard;
    }

    setCard(card) {
        this.card.push(card);
    }

    getCard() {
        return this.card;
    }

    getData() {
        return {
            "name": this.getName(),
            "idBoard": this.getIdBoard(),
            "pos": "top"
        }
    }
}