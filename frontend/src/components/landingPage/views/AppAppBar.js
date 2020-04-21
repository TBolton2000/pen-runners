import React from 'react';
import firebase from "firebase";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Avatar, IconButton } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          </div>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'Pen Runners'}
          </Link>
          <div className={classes.right}>
          {firebase.auth().currentUser === null ? 
            window.location.pathname === "/signin" ?
              <Button color="primary" />
              :
              <Button variant="outlined" color="secondary" href="/signin">Sign in</Button>
            : 
            <>
                <Avatar src={firebase.auth().currentUser.photoURL}></Avatar>
                <Button color="secondary" onClick={()=> firebase.auth().signOut()}>Sign Out</Button>
            </>
          }
            
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
