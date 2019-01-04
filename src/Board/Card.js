class Card
{
    constructor(idList, name, description, dueDate) {
        this.idList = idList;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.checklists = [];
    }

    getName () {
        return this.name;
    }

    getIdList () {
        return this.idList;
    }

    getDescription () {
        return this.description;
    }

    getDueDate () {
        return this.dueDate;
    }

    setCheclist (checklist) {
        return this.checklists.push(checklist);
    }

    getChecklists () {
        return this.checklists;
    }

    getDate() {
        return {
            name: this.getName(), 
            desc: this.getDescription(),
            idList: this.getIdList(),
            pos: 'bottom',
            due: this.getDueDate()
        };
    }
}