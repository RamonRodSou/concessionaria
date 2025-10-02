import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';

export function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translate(0, -50%)',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
                color: 'white'
            }}
        >
            <ArrowForwardIosIcon />
        </IconButton>
    );
}

export function PrevArrow(props: any) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translate(0, -50%)',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
                color: 'white'
            }}
        >
            <ArrowBackIosNewIcon />
        </IconButton>
    );
}