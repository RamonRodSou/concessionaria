import { v4 as uuidv4 } from 'uuid';
import { EMPTY } from '../../utils/string';

export class Person {

    constructor(
        public readonly id: string = uuidv4(),
        public firstname: string = EMPTY,
        public lastname: string = EMPTY,
        public email: string = EMPTY,
        public phone: string = EMPTY,
        public date: Date = new Date(),
        public createdAt: string = new Date().toISOString(),
    ) { }

    static fromJson(json: any): Person {
        return new Person(
            json.id,
            json.firstname,
            json.lastname,
            json.email,
            json.phone,
            new Date(json.date),
            json.createdAt
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            date: this.date.toISOString(),
            createdAt: this.createdAt
        };
    }
}
