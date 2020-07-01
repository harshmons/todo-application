import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import useStyles from './Header.styles';

const Header = props => {
  const classes = useStyles();
  const { actions, switchTheme, availableTheme } = props;
  const [lightTheme, setLightTheme] = React.useState(true);

  React.useEffect(() => {
    switchTheme(lightTheme);
  }, [lightTheme, switchTheme]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <EventNoteIcon fontSize="large" />
        <Typography variant="h6" className={classes.title}>
          ToDo Application
        </Typography>
        <Tooltip title={`Switch to ${availableTheme}`}>
          {lightTheme ? (
            <Brightness4Icon
              className={classes.icon}
              onClick={() => setLightTheme(false)}
              fontSize="large"
            />
          ) : (
            <Brightness7Icon
              className={classes.icon}
              onClick={() => setLightTheme(true)}
              fontSize="large"
            />
          )}
        </Tooltip>
        <AddBoxIcon
          className={classes.icon}
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
