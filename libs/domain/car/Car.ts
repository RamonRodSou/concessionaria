import { v4 as uuidv4 } from 'uuid';
import { EMPTY } from '../../utils/string';
import { Category } from '@classes/enum/Category';
import { TransmissionType } from '@classes/enum/TransmissionType';

export class Car {

    constructor(
        public readonly id: string = uuidv4(),
        public model: string = EMPTY,
        public description: string = EMPTY,
        public image: string[] = [],
        public category: Category = Category.OTHERS,
        public price: string = EMPTY,
        public color: string = EMPTY,
        public year: string = EMPTY,
        public type: TransmissionType = TransmissionType.MANUAL,
        public isActive: boolean = true,
        public createdAt: string = new Date().toISOString(),
    ) { }

    static fromJson(json: any): Car {
        return new Car(
            json.id,
            json.model,
            json.description,
            json.image || [],
            json.category,
            json.price,
            json.color,
            json.year,
            json.type,
            json.isActive,
            json.createdAt
        );
    }

    toJSON(): object {
        return {
            id: this.id,
            model: this.model,
            description: this.description,
            image: this.image,
            category: this.category,
            price: this.price,
            color: this.color,
            year: this.year,
            type: this.type,
            isActive: this.isActive,
            createdAt: this.createdAt
        };
    }
}
