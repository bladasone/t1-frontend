import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Box,
    CssBaseline,
    Button,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

export default function MainLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(!isMobile);
    const navigate = useNavigate();

    useEffect(() => {
        setDrawerOpen(!isMobile);
    }, [isMobile]);

    const toggleDrawer = () => setDrawerOpen((prev) => !prev);

    const drawerContent = (
        <List>
            <ListItemButton component={Link} to="/" onClick={() => isMobile && setDrawerOpen(false)}>
                <ListItemText primary="User List" />
            </ListItemButton>
            <ListItemButton component={Link} to="/user/create" onClick={() => isMobile && setDrawerOpen(false)}>
                <ListItemText primary="Create User" />
            </ListItemButton>
        </List>
    );

    // Пример ID пользователя для редактирования — замените на актуальный или из стора
    const userIdToEdit = '123';

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}
                        aria-label="toggle drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        User Manager
                    </Typography>

                    <Button
                        color="inherit"
                        onClick={() => navigate(`/user/${userIdToEdit}/edit`)}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 2 }}
                    >
                        Редактировать пользователя
                    </Button>

                    <Button
                        color="inherit"
                        onClick={() => navigate('/user/create')}
                        variant="outlined"
                        size="small"
                    >
                        Создать пользователя
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? 'temporary' : 'persistent'}
                open={drawerOpen}
                onClose={toggleDrawer}
                ModalProps={{ keepMounted: true }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                {drawerContent}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: drawerOpen && !isMobile ? `${drawerWidth}px` : 0,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
