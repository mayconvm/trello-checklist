class Checklist
{
    constructor(description, idTrelloChecklist) {
        this.description = description;
        this.idTrelloChecklist = idTrelloChecklist;
    }

    getDescription () {
        return this.description;
    }

    getIdTrelloChecklist() {
        return this.idTrelloChecklist;
    }

    getData() {
        return {
            "name" : this.getDescription(),
            "idChecklistSource" : this.getIdTrelloChecklist()
        }
    }
}