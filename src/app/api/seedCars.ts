import { v4 as uuidv4 } from "uuid";
import { db } from "../../../service/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const cars = [
    { id: uuidv4(), image: "https://technosou.com/images/Carros/Onix/onix-1.jpg", model: "Chevrolet Onix Plus", year: "2023/2024", price: "R$ 106.590,00", description: "1.0 Turbo, Automático, Flex" },
    { id: uuidv4(), image: "https://technosou.com/images/Carros/Strada/strada-1.jpg", model: "Fiat Strada Freedom", year: "2024/2024", price: "R$ 112.990,00", description: "1.3, Cabine Dupla, Manual, Flex" },
    { id: uuidv4(), image: "https://technosou.com/images/Carros/Creta/creta-1.jpg", model: "Creta Confort Plus TGDI", year: "2023/2023", price: "R$ 174.090,00", description: "1.0 Turbo, Automático, Flex" },
    { id: uuidv4(), image: "https://technosou.com/images/Carros/Compass/compass-1.jpg", model: "Jeep Compass Longitude", year: "2024/2024", price: "R$ 192.390,00", description: "1.3 T270, Automático, Flex" },
    { id: uuidv4(), image: "https://technosou.com/images/Carros/Corolla/corolla-1.jpg", model: "Toyota Corolla GR-S", year: "2023/2024", price: "R$ 177.290,00", description: "2.0, Automático, Híbrido" },
    { id: uuidv4(), image: "https://technosou.com/images/Carros/Nivus/nivus-1.jpg", model: "Volkswagen Nivus", year: "2023/2024", price: "R$ 147.890,00", description: "1.0 200 TSI, Automático, Flex" }
];

export async function seedCars() {
    const carsRef = collection(db, "cars");

    for (const car of cars) {
        const docRef = doc(carsRef, car.id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, car);
        }
    }

    console.log("✅ Carros cadastrados com sucesso!");
}

if (require.main === module) {
    seedCars().catch(console.error);
}