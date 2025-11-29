'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";

import "./style.scss";
import { Car } from '@classes/car/Car';
import { findAllCars } from '../../../../service/CarService';
import { useRouter } from 'next/navigation';
import CategoryCarousel from '../categoryCarousel';

export default function Item() {
    const [groupedCars, setGroupedCars] = useState<Record<string, Car[]>>({});
    const router = useRouter();

    function handleOpenCar(car: Car) {
        if (!car.id) {
            console.error("Carro sem ID, não é possível navegar.");
            return;
        }
        router.push(`/car/${car.id}`);
    }

    useEffect(() => {
        async function loadCars() {
            const cars = await findAllCars();
            
            const grouped = cars.reduce((acc, car) => {
                const category = car.category || 'Outros'; 
                
                if (!acc[category]) {
                    acc[category] = [];
                }
                
                acc[category].push(car);
                
                return acc;
            }, {} as Record<string, Car[]>);

            setGroupedCars(grouped);
        }
        loadCars();
    }, []);

    return (
        <Box id="solution" component="section" className="section">
            <Typography className="title bold"  style={{ color: 'var(--secundary)' }} data-aos="fade-up" gutterBottom>
                Nossos Veículos
            </Typography>
            <Box>
                {Object.entries(groupedCars).map(([category, cars]) => (
                    <CategoryCarousel 
                        key={category}      
                        title={category}
                        cars={cars}
                        onCarClick={handleOpenCar}
                    />
                ))}
            </Box>
        </Box>
    );
}