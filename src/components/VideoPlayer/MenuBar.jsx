import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MenuBar = ()=>{
    return (
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Music
            </Typography>
          </Toolbar>
        </AppBar>
      );
}
    

export default MenuBar;
