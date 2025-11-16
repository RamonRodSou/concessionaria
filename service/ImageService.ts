import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; 
import { deleteObject } from "firebase/storage";

async function _uploadSingleFile(file: File, path: string = 'carros'): Promise<string> {
    if (!file) {
        throw new Error("Nenhum arquivo fornecido para upload.");
    }

    try {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `${path}/${fileName}`);

        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;

    } catch (error) {
        console.error(`Erro ao fazer upload do arquivo ${file.name}:`, error);
        throw error; 
    }
}

export async function uploadImages(files: File[], path: string = 'carros'): Promise<string[]> {
    if (!files || files.length === 0) {
        return []; 
    }

    try {
        const uploadPromises = files.map(file => 
            _uploadSingleFile(file, path)
        );
        
        const downloadURLs = await Promise.all(uploadPromises);

        return downloadURLs;

    } catch (error) {
        console.error("Erro durante o upload de múltiplas imagens:", error);
        alert("Falha ao enviar uma ou mais imagens. Verifique o console.");
        throw error;
    }
}

export async function deleteImage(imageUrl: string): Promise<void> {
    try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);

    } catch (error) {
        console.error("Erro ao deletar imagem:", error);
    }
}