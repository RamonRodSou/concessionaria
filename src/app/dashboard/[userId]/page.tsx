'use client';

import './styles.scss'
import { Info } from "@mui/icons-material";
import {
    Avatar,
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { Car } from "@classes/car/Car";
import { findAllCars, findByCarId } from "@service/CarService";
import Search from "../../_component/search";
import NewBtn from '@/app/_component/newBtn';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CarDataModal from '@/app/_component/carDataModal';
import { AuthProvider } from '@/app/context/AuthContext';
import FooterNav from '@/app/_component/footerNav';
import Menu from '@/app/_component/menu';

export default function Dasboard() {
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<Car[]>([]);
    const [filtered, setFiltered] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [openData, setOpenData] = useState(false);

    const { userId } = useParams();
    const router = useRouter();

    function navToNewForm() {
        return router.push(`/newCar/${userId}`);
    }

    function handleOpenDetails(car: Car) {
        if (car.id) {
            findByCarId(car.id)
        }
        setSelectedCar(car);
        setOpenData(true);
    }

    useEffect(() => {
        findAllCars()
            .then((it) => {
                setData(it);
                setFiltered(it);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        setPage(0);
    }, [filtered])

    return (
        <main>
            <AuthProvider>
            <Box className='dashboard'>
                <Search<Car>
                    data={data}
                    onFilter={setFiltered}
                    label={'Buscar Carro'}
                    searchBy={(item, term) =>
                        item.model.toLowerCase().includes(term.toLowerCase())                    }
                />
                <TableContainer 
                    component={Paper} 
                    className='tableContainer'
                    sx={{ maxHeight: '70vh' }} 
                >                        
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className='title-secondary table'>Image</TableCell>
                                <TableCell className='title-secondary table'>Modelo</TableCell>
                                <TableCell className='title-secondary table'>Valor</TableCell>
                                <TableCell className='title-secondary table'>Cor</TableCell>
                                <TableCell className='title-secondary table'>Ano</TableCell>
                                <TableCell className='title-secondary table'>Categoria</TableCell>
                                <TableCell className='title-secondary table'>No Estoque</TableCell>
                                <TableCell className='title-secondary table'>Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filtered
                                .map((it) => (
                                    <TableRow key={it.id} className='data-table'>
                                        <TableCell className='data-text'>
                                            <Avatar
                                                src={it.image.at(0)}
                                                alt={it.model}  
                                                variant="rounded"
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        </TableCell>
                                        <TableCell className='data-text'>{it.model}</TableCell>
                                        <TableCell className='data-text'>{it.price}</TableCell>
                                        <TableCell className='data-text'>{it.color}</TableCell>
                                        <TableCell className='data-text'>{it.year}</TableCell>
                                        <TableCell className='data-text'>{it.category}</TableCell>
                                        <TableCell className='data-text'>{it.isActive ? 'Sim' : 'Não'}</TableCell>
                                        
                                        <TableCell className='data-text'>
                                            <IconButton onClick={() => handleOpenDetails(it)}>
                                                <Info />
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <NewBtn navTo={() => navToNewForm()} />
                <CarDataModal
                    open={openData}
                    onClose={() => setOpenData(false)}
                    car={selectedCar}
                />
            </Box>
            </AuthProvider>
        </main>
    );
}