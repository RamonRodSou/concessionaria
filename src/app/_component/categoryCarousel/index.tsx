// components/CategoryCarousel/CategoryCarousel.tsx

import { useRef } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Chip, IconButton } from "@mui/material";
import { Car } from '@classes/car/Car';
import { NextArrow, PrevArrow } from '../arrow/arrow';

type CategoryCarouselProps = {
    title: string;
    cars: Car[];
    onCarClick: (car: Car) => void;
};

export default function CategoryCarousel({ title, cars, onCarClick }: CategoryCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const showArrows = cars.length > 1;

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

    return (
        <Box mb={4}>
            <Typography variant="h4" gutterBottom sx={{ color: 'var(--secundary)', marginLeft: '1rem' }}>
                {title}
            </Typography>

            <Box className="carousel-container">
                {showArrows && (
                    <IconButton onClick={handleScrollLeft}>
                        <PrevArrow />
                    </IconButton>
                )}
                <Box ref={scrollContainerRef} className="carousel">
                    {cars?.map((it) => (
                        <Box key={it.id} className="car-box" onClick={() => onCarClick(it)}>
                            <Card className="car-card">
                                <CardMedia component="img" height="100" width="100" image={it.image.at(0)} alt={it.model} />

                                <CardContent>
                                    <Box className="flex justify-between items-center">
                                        <Typography gutterBottom variant="h5">{it.model}</Typography>
                                        <Typography variant="body2" color="text.secondary">{it.type}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.primary" noWrap>
                                        Ano: {it.year}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary" noWrap>
                                        {it.description}
                                    </Typography>
                                    <Typography variant="h5" className="car-price">R$: {it.price}</Typography>
                                    <Chip label='Ver mais' style={{ backgroundColor: 'var(--primary-btn)', color: 'var(--secondary)', border: 'none' }} className="year-chip" />

                                </CardContent>

                            </Card>
                        </Box>
                    ))}
                </Box>
                {showArrows && (
                    <IconButton onClick={handleScrollRight}>
                        <NextArrow />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}