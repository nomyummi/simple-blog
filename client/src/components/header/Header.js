import React from 'react';
import HomeLogo from './HomeLogo.js';
import LoginButton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import SignUpButton from './SignUpButton.js';
import CreatePostButton from './CreatePostButton.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

function Header(props){
  return (
    
      <AppBar position="static" color="primary" elevation={3}>
        <Container maxWidth="md">
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            <HomeLogo></HomeLogo>
          </Box>
            <LoginButton></LoginButton>
            <SignUpButton></SignUpButton>
            <CreatePostButton></CreatePostButton>
            <LogoutButton></LogoutButton>
        </Toolbar>
        </Container>
      </AppBar>
  );
}

export default Header;