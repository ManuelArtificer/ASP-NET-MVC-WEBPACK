import { Person } from './person';

export class User {
    constructor(private person: Person) {}

    displayName() {
        alert(this.person.getName());
    }
}