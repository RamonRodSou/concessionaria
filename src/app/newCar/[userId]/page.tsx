'use client';

import './styles.scss'
import { useEffect, useState, useRef } from 'react';
import { 
    Box, Button, CardMedia, Container, TextField, Typography, 
    CircularProgress, IconButton, Paper
} from "@mui/material";
import Slider from "react-slick";
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Car } from '@classes/car/Car';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import InputSelect from '../../_component/inputSelect';
import { Category } from '@classes/enum/Category';
import { TransmissionType } from '@classes/enum/TransmissionType';
import { createCar, findByCarId, updateCar } from '../../../../service/CarService';
import { uploadImages } from '../../../../service/ImageService';
import { Audit } from '@classes/audit/Audit';
import { auditAdd } from '@service/AuditService';
import { settings } from '@utils/settings';
import { EMPTY } from '@utils/string';
import Menu from '@/app/_component/menu';
import FooterNav from '@/app/_component/footerNav';

export default function NewCarPage() {
    const [car, setCar] = useState<Car>(new Car());
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>(Category.OTHERS);
    const [type, setType] = useState<TransmissionType>(TransmissionType.MANUAL);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [stagedFile, setStagedFile] = useState<File | null>(null); 
    const [newFiles, setNewFiles] = useState<File[]>([]); 
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const { userId } = useParams();

    const fileInputRef = useRef<HTMLInputElement>(null); 
    const router = useRouter();

    const searchParams = useSearchParams(); 
    
    const carId = searchParams.get('carId') as string;

    const isEditOrNew = isEditing ? `Editar carro: ${car?.model}` : 'Novo Carro';

    function handleChange(field: keyof Car, value: any) {
        const parsedValue = value;

                setCar(prev => {
            const updated = { ...prev, [field]: parsedValue };
            return Car.fromJson(updated);
        });
    };

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        
        const regex = /^[0-9.,]*$/; 
    
        if (regex.test(value) || value === "") {
            handleChange("price", value);
        }
    }

    function handleFileSelect (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setStagedFile(e.target.files[0]);
        }
    };

    function handleAddImage () {
        if (imagePreviews.length >= 3) {
            alert("Máximo de 3 imagens atingido.");
            return;
        }

        if (stagedFile) {
            const previewUrl = URL.createObjectURL(stagedFile);
            setImagePreviews(prev => [...prev, previewUrl]);
            setNewFiles(prev => [...prev, stagedFile]);
            
            setStagedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; 
            }
        }
    };

    function handleRemoveImage (indexToRemove: number) {
        const urlToRemove = imagePreviews[indexToRemove];

        if (urlToRemove.startsWith('blob:')) {
            let fileIndexToRemove = -1;
            let blobCount = 0;
            for(let i=0; i <= indexToRemove; i++) {
                if (imagePreviews[i].startsWith('blob:')) {
                    if (i === indexToRemove) {
                        fileIndexToRemove = blobCount;
                    }
                    blobCount++;
                }
            }
            
            if (fileIndexToRemove > -1) {
                setNewFiles(prev => prev.filter((_, i) => i !== fileIndexToRemove));
            }
            URL.revokeObjectURL(urlToRemove);
        }

        setImagePreviews(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    async function handleCancel() {
        return router.push(`/dashboard/${userId}`); 
    }

    async function navToDashboard() {
        return router.push(`/dashboard/${userId}`);
    }

	async function handleSubmit(e: React.FormEvent): Promise<void> {
		e.preventDefault();
		setIsLoading(true);
	
		try {
			const existingUrls = imagePreviews.filter(url => !url.startsWith('blob:'));
			const newUploadedUrls = await uploadImages(newFiles, 'carros');
	
			const finalImageUrls = [...existingUrls, ...newUploadedUrls];
	
			const carData = Car.fromJson({
				...car,
				category,
				type, 
				image: finalImageUrls 
			})
	            
			if (isEditing) {

                const audit = Audit.create(isEditOrNew, carData.id);

				await updateCar(carId, carData.toJSON());
                await auditAdd(audit)

			} else {

				await createCar(carData);
			}

        navToDashboard()
	
		} catch (error) {
			console.error("Falha no handleSubmit: ", error);
		} finally {
			setIsLoading(false);
		}
	}

    useEffect(() => {
        if (!carId) {
            setIsEditing(false);
            setCar(new Car());
            setImagePreviews([]);
            setNewFiles([]);
            return;
        }

        const loadCarData = async () => {
            try {

                const carData = await findByCarId(carId); 

                if (carData) {

                    setCar(Car.fromJson(carData)); 
                    setCategory(carData.category || Category.OTHERS);
                    setType(carData.type || TransmissionType.MANUAL);
                    setImagePreviews(carData.image || []);
                    setNewFiles([]);
                    setIsEditing(true);
                } else {

                    console.error("Carro não encontrado!");
                }
            } catch (error) {

                console.error("Erro ao carregar dados do carro:", error);
            }
        };

        loadCarData();
    }, [carId]);

    return (
        <Container className='details-container'>
        <form onSubmit={handleSubmit} className="details-form">
            <h2>{isEditOrNew}</h2>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary' }}>
                    Imagens (Máx 3)
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AddPhotoAlternateIcon />}
                        disabled={imagePreviews.length >= 3}
                    >
                        Selecionar
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />
                    </Button>
                    <Typography 
                        variant="body2" 
                        sx={{ fontStyle: 'italic', color: 'text.secondary', flexGrow: 1 }}
                    >
                        {stagedFile ? stagedFile.name : "Nenhum arquivo selecionado"}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleAddImage}
                        disabled={!stagedFile || imagePreviews.length >= 3}
                    >
                        Adicionar
                    </Button>
                </Box>
            </Paper>

            {imagePreviews.length > 0 && (
                <Box mb={2}>
                    <Typography 
                        variant="subtitle1" 
                        gutterBottom
                        sx={{ color: 'text.primary' }}
                    >
                        Previews:
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, position: 'relative' }}>
                        <Slider {...settings}>
                            {imagePreviews.map((previewUrl, index) => (
                                <div key={index}> 
                                    <Box sx={{ position: 'relative' }}>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleRemoveImage(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                zIndex: 10,
                                                backgroundColor: 'rgba(255, 255, 255, 0.7)'
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={previewUrl}
                                            alt={`Preview ${index + 1}`}
                                            sx={{ objectFit: 'contain' }}
                                        />
                                    </Box>
                                </div>
                            ))}
                        </Slider>
                    </Paper>
                </Box>
            )}
            
            <Box mb={2}>
                <TextField 
                    label="Modelo" 
                    value={car.model} 
                    onChange={(e) => handleChange("model", e.target.value.toUpperCase())} 
                    fullWidth 
                    required 
                />
            </Box>
            <Box mb={2}>
                <TextField 
                    label="Valor" 
                    type="text" 
                    inputMode="decimal" 
                    value={car?.price || EMPTY} 
                    onChange={handlePriceChange} 
                    fullWidth 
                    required 
                />
            </Box>
            <Box mb={2}>
                <TextField 
                    label="Ano" 
                    type="number" 
                    value={car?.year} 
                    onChange={(e) => handleChange("year", e.target.value)} 
                    fullWidth 
                    required 
                />
            </Box>
            <Box mb={2}>
                <TextField 
                    label="Cor" 
                    type="text" 
                    value={car?.color} 
                    onChange={(e) => handleChange("color", e.target.value.toUpperCase())} 
                    fullWidth 
                    required 
                />
            </Box>
            <Box mb={2}>
                <TextField 
                    label="Descrição" 
                    value={car?.description.toUpperCase()} 
                    onChange={(e) => handleChange("description", e.target.value.toUpperCase())} 
                    fullWidth 
                    multiline 
                    rows={4} 
                />
            </Box>
            <InputSelect 
                label="Categoria" 
                value={category} 
                enumObject={Category} 
                onchange={setCategory} 
            />
            <InputSelect 
                label="Câmbio" 
                value={type} 
                enumObject={TransmissionType} 
                onchange={setType} 
            />

            <Box display='flex' gap='2rem'>
                <Button 
                    variant="contained" 
                    color="error" 
                    fullWidth
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading 
                        ? <CircularProgress size={24} color="inherit" /> 
                        : (isEditing ? 'Atualizar Carro' : 'Salvar Carro')
                    }
                </Button>
            </Box>
        </form>
        </Container>
    );
}