// components/Navbar.js

import { useState } from 'react';
import { useRouter } from 'next/router'; // Importing useRouter for page navigation
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for controlling the drawer visibility
  const router = useRouter(); // Hook for navigation
  
  // Function to toggle the drawer open/close
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to navigate to a page
  const handleNavigation = (path) => {
    router.push(path); // Navigate to the passed path (SignIn, SignUp, etc.)
    setDrawerOpen(false); // Close the drawer after navigating
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#363435' }}>
      <Toolbar>
        {/* Logo or Brand */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyWebsite
        </Typography>
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-4">
          <Button color="inherit" onClick={() => handleNavigation('/signin')}>Sign In</Button>
          <Button color="inherit" onClick={() => handleNavigation('/signup')}>Sign Up</Button>
        </div>

        {/* Mobile Menu Icon (Hamburger) */}
        <IconButton
          color="inherit"
          aria-label="open menu"
          edge="end"
          onClick={toggleDrawer}
          sx={{ display: { lg: 'none', xs: 'flex' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for Mobile View */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <List sx={{ width: 250 }}>
            <ListItem button onClick={() => handleNavigation('/signin')}>
              <ListItemText primary="Sign In" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/signup')}>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
