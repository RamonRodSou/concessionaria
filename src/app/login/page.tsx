'use client';

import './styles.scss'
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { EMPTY } from '@utils/string';
import { auth } from '@service/firebase';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState(EMPTY);
    const [password, setPassword] = useState(EMPTY);
    const [error, setError] = useState(EMPTY);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    function handleTogglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    };

    async function handleLogin (e: React.FormEvent) {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;  
                
            if(userId) router.push(`/dashboard/${userId}`);
    

        } catch (err: any) {
            setError("E-mail ou senha inválidos");
            alert('Usuario Invalido')
            console.error(err);
        }
    };

    return (
        <AuthProvider>
        <Box className='box'>
            <form className='form' onSubmit={handleLogin}>
                <h2 className='title'>Login</h2>
                <TextField 
                    type='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full mb-3 p-2 border rounded'
                />
                <TextField 
                    type={showPassword ? "text" : "password"}
                    placeholder='Senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='w-full mb-3 p-2 border rounded'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {error && <p className='text-error'>{error}</p>}
                <Button
                    type='submit'
                    className='button'
                >
                    Entrar
                </Button>
            </form>
        </Box>
        </AuthProvider>
    );
}