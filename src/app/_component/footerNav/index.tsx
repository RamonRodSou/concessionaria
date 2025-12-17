'use client';
import './style.scss'
import Image from 'next/image';
import logo from '@img/logo.webp'
import { Box } from '@mui/material';

export default function FooterNav() {

    function handleClick() {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_WHATSAPPS_MSG}`

        } catch (error) {
            console.error("Routing Error", error)
        }
    }

    return (
        <Box className="footer" onClick={handleClick}>
            <p className='description'>© Copyright</p>
            <span>            
                <Image src={logo} alt="Logo Technosou Solution" width={20} />
                <p className='description'>Technosou & Panda Hub - Since 2023</p>
            </span>
        </Box>
    )
}
