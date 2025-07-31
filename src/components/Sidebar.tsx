import { List, ListItem, ListItemButton, ListItemText, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemText primary="User List" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/user/create')}>
                        <ListItemText primary="Create User" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
