import './styles.scss'
import { CardMedia, Dialog, DialogContent, Typography } from '@mui/material';

import { useState } from 'react';
import { Car } from '@classes/car/Car';
import { useParams } from 'next/navigation';
import { auditAdd } from '@service/AuditService';
import { Audit } from '@classes/audit/Audit';
import Slider from 'react-slick';
import { Box } from '@mui/system';
import { DateUtil } from '@utils/dateUtils';
import ConfirmModal from '../confirmModal';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { settings } from '@utils/settings';
import { NOT_REGISTED } from '@utils/string';
import { updateCar } from '@service/CarService';
import DeleteAndEditBtns from '../DeleteAndEditBtns';
import { useRouter } from 'next/navigation';

interface CarDataModalProps {
    open: boolean;
    onClose: () => void;
    car: Car | null;
}

export default function CarDataModal({ open, onClose, car }: CarDataModalProps) {
    const [openData, setOpenData] = useState(false);
    const { userId } = useParams();
    const router = useRouter();

    if (!car) return null;

    async function edit(carId: String) {
        return await router.push(`/newCar/${userId}?carId=${carId}`);
    }
                                                                                                                                                                                                            
    async function remove(car: Car): Promise<void> {

        car.isActive = false;
        const audit = Audit.create(`Carro ${car.model} foi Inativado. carId: ${car.id}`, String(userId));

        await updateCar(car.id, car);
        await auditAdd(audit);

        setOpenData(false);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DeleteAndEditBtns 
                edit={() => edit(car.id)}
                remove={() => remove(car)}
            />
            <DialogContent dividers className='dialog'>
                <Typography className='title'>{car.model}</Typography>
                <Box sx={{ width: '100%', height: 350, overflow: 'hidden', mb: 1, mt: 2, display: 'flex', flexDirection: 'row'}}>
                    <Slider {...settings}>
                        {car.image.map((imgUrl, index) => (
                            <Box key={index} sx={{ position: 'relative', padding: 1, display: 'flex', flexDirection: 'row'}}>
                                <CardMedia
                                    component="img"
                                    image={imgUrl}
                                    alt={`Imagem ${index + 1} do ${car.model}`}
                                    sx={{ width: '100%', borderRadius: 2 }}
                                />
                            </Box>
                        ))}
                    </Slider>
                </Box>
                <Typography className='textInfo'> <span className='subTextInfo'>Categoria: </span>{car.category ?? NOT_REGISTED}</Typography>
                <Typography className='textInfo'> <span className='subTextInfo'>Valor: </span>{car.price ?? NOT_REGISTED}</Typography>
                <Typography className='textInfo'> <span className='subTextInfo'>Cor: </span>{car.color ?? NOT_REGISTED}</Typography>
                <Typography className='textInfo'> <span className='subTextInfo'>Ano: </span>{car.year ?? NOT_REGISTED}</Typography>
                <Typography className='textInfo'> <span className='subTextInfo'>Cãmbio: </span>{car.type ?? NOT_REGISTED}</Typography>
                <Typography className='textInfo'> <span className='subTextInfo'>Em Estoque: </span>{car.isActive ? 'Sim' : 'Não'}</Typography>
                <Typography className='textInfo'> <span className='subTextInfo'>Descrição: </span>{car.description ?? NOT_REGISTED}</Typography>
                <Typography className='textInfo'> <span className='subTextInfo'>Cadastrado: </span>{DateUtil.dateFormated(car?.createdAt)}</Typography>
            </DialogContent>
            <ConfirmModal
                message={`Tem certeza que deseja remover o carro. ${car.model}`}
                open={openData}
                onConfirm={() => remove(car)}
                onClose={() => setOpenData(false)}
            />
        </Dialog>
    );
}