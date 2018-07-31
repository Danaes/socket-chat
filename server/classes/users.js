class Users {

    constructor() {
        this.people = [];
    }

    addPerson(id, name, lobby) {
        let person = { id, name, lobby };

        this.people.push(person);

        return this.people;
    }

    getPerson(id) {
        let person = this.people.filter(psn => psn.id === id)[0];

        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeopleByLobby(lobby) {
        let peopleLobby = this.people.filter(person => person.lobby === lobby);
        return peopleLobby;
    }

    removePerson(id) {

        let removedPerson = this.getPerson(id);

        this.people = this.people.filter(person => person.id != id);

        return removedPerson;
    }

}

module.exports = {
    Users
}