import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import TaskListsContainer from './components/taskLists';
import { lightTheme, darkTheme } from './themes';
import useStyles from './App.styles';
import ModalContainer from './components/modal';
import HeaderContainer from './components/header';

const defaultTheme = lightTheme;

const App = () => {
  const classes = useStyles();
  const [theme, setTheme] = React.useState(defaultTheme);

  const switchThemeHandler = state => {
    setTheme(state ? lightTheme : darkTheme);
  };

  const availableTheme = `${theme === lightTheme ? 'Dark' : 'Light'} theme`;
  return (
    <ThemeProvider theme={theme}>
      <ModalContainer />
      <HeaderContainer
        availableTheme={availableTheme}
        switchTheme={switchThemeHandler}
      />
      <div className={classes.taskListsContainer}>
        <TaskListsContainer />
      </div>
    </ThemeProvider>
  );
};

export default App;
