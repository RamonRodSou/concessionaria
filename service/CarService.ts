import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Car } from "@classes/car/Car";


export async function findAllCars(): Promise<Car[]> {
    try {

        const snapshot = await getDocs(collection(db, 'cars'));
        return snapshot.docs.map((it) => ({ id: it.id, ...it.data() } as Car))
    } catch (error) {
        alert('Erro ao listar carros: ' + error);
        throw error;
    }
}

export async function findByCarId(id: string): Promise<Car | null> {
    try {
        const ref = doc(db, 'cars', id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) return null;

        return { id: snapshot.id, ...snapshot.data() } as Car;
    } catch (error) {
        alert('Erro ao buscar carros: ' + error);
        throw error;
    }
}