import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import useStyles from './Header.styles';

const Header = props => {
  const classes = useStyles();
  const { actions } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          TODO Application
        </Typography>
        <AddBoxIcon
          className={classes.add}
          onClick={actions.addTaskListHandler}
          fontSize="large"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
