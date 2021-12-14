import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

import LoginButton from './LoginButton';

const styles = {
  flex: {
    flex: 1,
  },
};

const AppHeader = ({ classes }) => (  
<AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        PetAdopt
      </Typography>
      <Button color="inherit" component={Link} to="/">Página Inicial</Button>
      <Button color="inherit" component={Link} to="/posts">Anúncios</Button>
      <div className={classes.flex} />
      <LoginButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(AppHeader);
