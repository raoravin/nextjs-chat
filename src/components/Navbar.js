// components/Navbar.js

"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { FaBars, FaUser, FaSignInAlt } from 'react-icons/fa'; // Importing icons from react-icons

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to toggle the drawer
  const router = useRouter(); // Router for navigation

  // Function to toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    router.push(path);
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
          <Button
            color="inherit"
            onClick={() => handleNavigation('/signin')}
            startIcon={<FaSignInAlt />} // Adding the SignIn icon
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            onClick={() => handleNavigation('/signup')}
            startIcon={<FaUser />} // Adding the SignUp icon
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Icon (Hamburger) */}
        <IconButton
          color="inherit"
          aria-label="open menu"
          edge="end"
          onClick={toggleDrawer}
          sx={{ display: { lg: 'none', xs: 'flex' } }}
        >
          <FaBars /> {/* Hamburger Menu Icon from react-icons */}
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
