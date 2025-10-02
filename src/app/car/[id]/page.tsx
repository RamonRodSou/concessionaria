'use client';

import './styles.scss'
import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, Chip, Button, Grid, Container } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Slider from "react-slick";
import { Car } from '@classes/car/Car';
import { useParams, useRouter } from 'next/navigation';
import { findByCarId } from '../../../../service/CarService';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Menu from '@/app/_component/menu';
import { NextArrow, PrevArrow } from '@/app/_component/arrow/arrow';

export default function CarDetailPage() {
    const [car, setCar] = useState<Car | null>(null);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const carId = params.id as string;

    useEffect(() => {
        if (!carId) return;

        async function loadCarDetails() {
            try {
                const carData = await findByCarId(carId);
                if (carData) setCar(carData);
                else setError("Veículo não encontrado.");
            } catch (err) {
                setError("Ocorreu um erro ao carregar os detalhes do veículo.");
                console.error(err);
            }
        }

        loadCarDetails();
    }, [carId]);

    if (!car) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <html>
            <header>
                <Menu />
            </header>
            <Container component="main" className='container-car'>
                <Card raised>
                    <Grid container spacing={4}>
                        <Grid>
                            <Slider {...settings}>
                                {car.image.map((imgUrl, index) => (
                                    <Box key={index} sx={{ position: 'relative', padding: 1 }}>
                                        <CardMedia
                                            component="img"
                                            image={imgUrl}
                                            alt={`Imagem ${index + 1} do ${car.model}`}
                                            sx={{ width: '100%', borderRadius: 2 }}
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        </Grid>

                        <Grid className="grid-data">
                            <Box className="flex justify-between items-center">
                                <Typography variant="body1" className='title-car' component="h3" gutterBottom>
                                    {car.model}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">{car.type}</Typography>

                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Chip label={`Ano: ${car.year}`} color="primary" />
                            </Box>

                            <Typography variant="h4" color="primary" gutterBottom>
                                R$ {car.price}
                            </Typography>

                            <Typography variant="body1" paragraph>
                                {car.description}
                            </Typography>

                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                startIcon={<WhatsAppIcon />}
                                href={`https://api.whatsapp.com/send?phone=553298214116&text=Olá! Tenho interesse no ${car.model} ${car.year}.`}
                                target="_blank"
                            >
                                Falar com Vendedor
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </html>
    );
}
