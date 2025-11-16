import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Car } from "@classes/car/Car";

export async function createCar(car: Car) {

    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuário não autenticado.");

        const saveData = await saveCarToDatabase(car, user.uid)

        await addDoc(collection(db, 'cars'), saveData);

    } catch (error) {
        alert('Erro ao registrar um novo visitante: ' + error);
        throw error;
    }
}

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

export async function updateCar(id: string, data: Partial<Car>): Promise<void> {
    try {
        const ref = doc(db, 'cars', id);
        await updateDoc(ref, data);
    } catch (error) {
        alert('Erro ao atualizar carro: ' + error);
        throw error;
    }
}


export async function deleteCar(carId: string): Promise<void> {
    try {
        const carRef = doc(db, "cars", carId);
        await deleteDoc(carRef);
    } catch (error) {
        alert('Erro ao deletar o carro: ' + error);
        throw error;
    }
}

async function saveCarToDatabase(car: Car, userId: string) {
    const memberData = {
        userId,
        model: car.model,
        description: car.description,
        image: car.image,
        category: car.category,
        price: car.price,
        color: car.color,
        year: car.year,
        type: car.type,
        isActive: car.isActive,
        createdAt: car.createdAt,
    };

    return await memberData;
}