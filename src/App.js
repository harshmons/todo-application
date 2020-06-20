import React from 'react';
import TaskListsContainer from './components/taskLists';
import useStyles from './App.styles';
import ModalContainer from './components/modal';
import HeaderContainer from './components/header';

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ModalContainer />
      <HeaderContainer />
      <div className={classes.taskListsContainer}>
        <TaskListsContainer />
      </div>
    </React.Fragment>
  );
};

export default App;
