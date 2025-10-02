'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Chip, IconButton } from "@mui/material";

import "./style.scss";
import { Car } from '@classes/car/Car';
import { findAllCars } from '../../../../service/CarService';
import { useRouter } from 'next/navigation';
import { NextArrow, PrevArrow } from '../arrow/arrow';

export default function Item() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [carsForSale, setCarsForSale] = useState<Car[]>([]);
    const router = useRouter();

    function handleScrollRight() {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    function handleScrollLeft() {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

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
            setCarsForSale(cars);
        }
        loadCars();
    }, []);

    return (
        <Box id="solution" component="section" className="section">
            <Typography className="title bold" data-aos="fade-up" gutterBottom>
                Nossos Veículos
            </Typography>

            <Box className="carousel-container">

                <IconButton onClick={handleScrollLeft}>
                    <PrevArrow />
                </IconButton>
                <Box ref={scrollContainerRef} className="carousel">
                    {carsForSale?.map((it, index) => (
                        <Box key={index} className="car-box" onClick={() => handleOpenCar(it)}>
                            <Card className="car-card">
                                <CardMedia component="img" height="200" image={it.image.at(0)} alt={it.model} />
                                <CardContent>
                                    <Box className="flex justify-between items-center">
                                        <Typography gutterBottom variant="h5">{it.model}</Typography>
                                        <Typography variant="body2" color="text.secondary">{it.type}</Typography>
                                    </Box>
                                    <Chip label={it.year} color="primary" className="year-chip" />
                                    <Typography variant="body2" color="text.secondary">{it.description}</Typography>
                                    <Typography variant="h5" className="car-price">R$: {it.price}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
                <IconButton onClick={handleScrollRight}>
                    <NextArrow />
                </IconButton>

            </Box>
        </Box>
    );
}
