import './styles.scss'
import { Delete, Edit, WhatsApp } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface Props {
    edit: () => void;
    remove: () => void;
}

export default function DeleteAndEditBtns({edit, remove}: Props) {
    return (
        <Box className='btns'>
            <Box className='title-and-editBtn'>
                <IconButton onClick={edit} className='editBtn'>
                    <Edit/>
                </IconButton>
            </Box>                
            <Box className='delete'>
                <IconButton onClick={remove} className='deleteBtn'>
                    <Delete/>
                </IconButton>     
            </Box>
        </Box>
)

}