"use client";
import './style.scss'

import { Box } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HeroCarouselProps {
    slides: StaticImageData[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear',
        arrows: true
    };

    return (
        <Box component="section" className='hero'>
            <Slider {...settings}>
                {slides.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 400
                        }}
                    ><Box component="section" className="hero-carousel">
                            <Slider {...settings}>
                                {slides.map((image, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            height: 400
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
