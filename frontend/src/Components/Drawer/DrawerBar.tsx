import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';

import Dashboard from '../../pages/Dashboard';

export default function DrawerBar() {
  return (
    <div>
      <Box>
        <Drawer>
          <List>
            <ListItem>
              hi
            </ListItem>
            <ListItem>
              hi
            </ListItem>
            <ListItem>
              hi
            </ListItem>
            <ListItem>
              hi
            </ListItem>
            <ListItem>
              hi
            </ListItem>
            <ListItem>
              hi
            </ListItem>
            <ListItem>
              hi
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
}


{/* <CssBaseline /> */ }

{/* <Drawer
sx={{
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}}
variant="permanent"
anchor="left"
> */}
{/* <Toolbar /> */ }
{/* <Divider />
<List>
  <ListItem disablePadding onClick={event => gotoPage('dashboard')}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardCustomizeRoundedIcon />
      </ListItemIcon>
      <ListItemText>
        Dashboard
      </ListItemText>
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <NewspaperRoundedIcon />
      </ListItemIcon>
      <ListItemText>
        News
      </ListItemText>
    </ListItemButton>
  </ListItem>
</List>
<Divider />
<List>
</List> */}
{/* </Drawer> */ }