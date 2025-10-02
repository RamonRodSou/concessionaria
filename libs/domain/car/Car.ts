import { v4 as uuidv4 } from 'uuid';
import { EMPTY } from '../../utils/string';

export class Car {

    constructor(
        public readonly id: string = uuidv4(),
        public model: string = EMPTY,
        public description: string = EMPTY,
        public image: string[] = [],
        public price: string = EMPTY,
        public year: string = EMPTY,
        public createdAt: string = new Date().toISOString(),
    ) { }

    static fromJson(json: any): Car {
        return new Car(
            json.id,
            json.model,
            json.description,
            json.image || [],
            json.price,
            json.year,
            json.createdAt
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            model: this.model,
            description: this.description,
            image: this.image,
            price: this.price,
            year: this.year,
            createdAt: this.createdAt
        };
    }
}
