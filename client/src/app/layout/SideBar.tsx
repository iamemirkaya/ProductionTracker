import { Drawer, List, ListItemButton, ListItemText, IconButton } from '@mui/material';
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


export default function SideBar() {


    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => () => {
        setOpen(open);
    };

  return (
     <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItemButton onClick={() => {
            navigate('/');
            setOpen(false);
          }}>
            <ListItemText primary="Ana Sayfa" />
          </ListItemButton>

          <ListItemButton onClick={() => {
            navigate('/product');
            setOpen(false);
          }}>
            <ListItemText primary="Ürünler" />
          </ListItemButton>

          <ListItemButton>
            <ListItemText primary="Raporlar" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
