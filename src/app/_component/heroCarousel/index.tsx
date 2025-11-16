"use client";
import './style.scss'

import { Box } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from '@utils/settings';

interface HeroCarouselProps {
    slides: StaticImageData[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {

    return (
        <Box component="section" className='hero'>
            <Slider {...settings}>
                {slides.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: { xs: 180, sm: 250, md: 400 }
                        }}
                    >

                        <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                            priority={index === 0}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>

    );
}
