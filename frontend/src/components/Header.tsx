import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { Link } from '@reach/router';
import { ReactComponent as Logo } from '../listo_pink.svg';

const Header = () => {
  const classes = useStyles({});
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.logo}>
            <Logo />
          </Link>
          <Link to="/faq" className={classes.logo}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.menuItem}
            >
              FAQ
            </Typography>
          </Link>
          <Link to="/checklists" className={classes.logo}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.menuItem}
            >
              CHECKLISTS
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
