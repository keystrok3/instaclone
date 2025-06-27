import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Import Instagram-style icons
import HomeIcon from '@mui/icons-material/Home'; // Filled for active
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined'; // For Reels
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'; // For Messages
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu'; // For "More"

import instagramlogo from '../../assets/images/instaimage_edit.png';

const Sidebar = () => {
    // In a real app, this would likely come from your router (e.g., useLocation)
    const [activeItem, setActiveItem] = useState('Home');

    const menuItems = [
        { text: 'Home', activeIcon: <HomeIcon />, inactiveIcon: <HomeOutlinedIcon /> },
        { text: 'Search', inactiveIcon: <SearchIcon />, special: true }, // Search doesn't have a filled version
        { text: 'Explore', inactiveIcon: <ExploreOutlinedIcon /> },
        { text: 'Reels', inactiveIcon: <SlideshowOutlinedIcon /> },
        { text: 'Messages', inactiveIcon: <ChatOutlinedIcon /> },
        { text: 'Notifications', inactiveIcon: <FavoriteBorderOutlinedIcon /> },
        { text: 'Create', inactiveIcon: <AddCircleOutlineOutlinedIcon /> },
        { text: 'Profile', inactiveIcon: <AccountCircleOutlinedIcon /> },
    ];

    const iconSx = {
        minWidth: 'auto',
        marginRight: '16px',
        fontSize: '28px'
    };

    return (
        <Stack
            sx={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
                padding: '8px 12px 20px 12px',
                borderRight: '1px solid rgb(219, 219, 219)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Instagram Logo */}
            <Box
                component="img"
                src={instagramlogo}
                alt="Instagram"
                sx={{ 
                    width: '103px',
                    // Move padding and margin here from the parent Box
                    paddingLeft: '12px',
                    paddingTop: '25px',
                    paddingBottom: '25px',
                    marginBottom: '10px'
                }}
            />

            {/* Main Navigation */}
            <List sx={{ padding: 0 }}>
                {menuItems.map((item) => {
                    const isActive = activeItem === item.text;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ marginBottom: '8px' }}>
                            <ListItemButton
                                onClick={() => !item.special && setActiveItem(item.text)}
                                sx={{ borderRadius: '8px', padding: '4px' }}
                            >
                                <ListItemIcon sx={iconSx}>
                                    {isActive && item.activeIcon ? item.activeIcon : item.inactiveIcon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 'bold' : 'normal',
                                        variant: 'body1',
                                        fontSize: '16px'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Spacer to push "More" to the bottom */}
            <Box sx={{ flexGrow: 1 }} />

            {/* "More" Menu */}
            <List sx={{ padding: 0 }}>
                <ListItem disablePadding>
                    <ListItemButton sx={{ borderRadius: '8px', padding: '5px' }}>
                        <ListItemIcon sx={iconSx}>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="More"
                            primaryTypographyProps={{
                                variant: 'body1',
                                fontSize: '16px'
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Stack>
    );
};

export default Sidebar;