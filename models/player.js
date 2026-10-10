export class Player {
    constructor(Id, name, joinedAt = new Date().toISOString()) {
        this.Id = Id;
        this.name = name;
        this.joinedAt = joinedAt;
    }
}

