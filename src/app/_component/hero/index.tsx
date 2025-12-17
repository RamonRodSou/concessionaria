import './style.scss'
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

export default function Hero() {
    return (
        <Box component="section" className='heroSection'>
        <Container maxWidth="xl">
            <Box className='contentWrapper'>
            <Box className='rightColumn'>
                <Typography variant="h2" component="h1" className='mainTitle'>
                Seu <br />
                <span>Novo Carro</span> <br />
                Espera <br />
                Por Você
                </Typography>

                <Box className='ctaBox'>
                <Typography variant="h6" className='ctaText'>
                    Ofertas exclusivas <br />
                    em veículos <br />
                    semi-novos <br />
                    e usados
                </Typography>
                </Box>
            </Box>

            </Box>
        </Container>
        </Box>
    );
};