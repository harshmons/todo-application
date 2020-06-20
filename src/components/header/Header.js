import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import useStyles from './Header.styles';

const Header = props => {
  const classes = useStyles();
  const { actions } = props;
  return (
    <AppBar position="sticky">
      <Toolbar>
        <EventNoteIcon fontSize="large" />
        <Typography variant="h6" className={classes.title}>
          ToDo Application
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

Header.propTypes = {
  actions: PropTypes.shape({
    addTaskListHandler: PropTypes.func.isRequired,
  }),
};

export default Header;
