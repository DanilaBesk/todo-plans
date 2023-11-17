'use client';
import React, { useState } from 'react';
import { ListItemButton, Collapse, ListItemText, List } from '@mui/material';

type Props = {
  type: string;
};

const NavbarCollapse = ({ type }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen((pre) => !pre);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={type} />
        {open ? 'close' : 'open'}
      </ListItemButton>
      <Collapse in={open}>
        <List>
          <ListItemButton>
            <ListItemText primary="opened" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default NavbarCollapse;
