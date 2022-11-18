import './App.css'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

/*
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
*/


import Lookup from './components/Lookup';

function App() {
  /*
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    // console.log('handleDrawerToggle', drawerOpen);
  };
  */

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          { /*
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
  */ }
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            GraphQL ZipCode Lookup
          </Typography>
        </Toolbar>
      </AppBar>
      { /* 
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <List>
          <ListItem key="Home" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>

      </SwipeableDrawer>
  */}
      <Container maxWidth="sm">
        <Lookup />
      </Container>
    </Box >
  )
}

export default App;
