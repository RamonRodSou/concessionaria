"use client";
import { useState } from "react";
import Logo from '../logo';
import './style.scss'
import { Box } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => setOpen(!open);

    function navToHome() {
        router.push(`/`);
    }

    function navToForm() {
        router.push(`/#talkToUs`);
    }

    function navToLogin() {
        router.push(`/login`);
    }

    return (
        <>
            <nav className="menu">
                <Box component="section" className="menu-inner">
                    <Logo />
                    <button className={`menu-toggle ${open ? "open" : ""}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul className={`menu-list ${open ? "menu-list-open" : ""}`}>
                        <li>
                            <a href="#top" onClick={navToHome}>Home</a>
                        </li>
                        <li>
                            <a href="#talkToUs" onClick={navToForm}>Agendamento</a>
                        </li>
                        {/* <li>
                            <a onClick={navToLogin}>Login</a>
                        </li> */}
                        <li>
                            <a
                                href={process.env.NEXT_PUBLIC_WHATSAPPS_MSG}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                            >
                                Contato
                            </a>
                        </li>
                    </ul>

                </Box>
            </nav>

            {open && <Box component="span" className="menu-overlay" onClick={toggleMenu}></Box>}
        </>
    );
}
