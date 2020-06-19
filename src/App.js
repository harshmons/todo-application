import React from 'react';
import TaskListContainer from './components/taskList/TaskListContainer';
import useStyles from './App.styles';
import ModalContainer from './components/modal/ModalContainer';
import HeaderContainer from './components/header/HeaderContainer';

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ModalContainer />
      <HeaderContainer />
      <div className={classes.taskListContainer}>
        <TaskListContainer />
      </div>
    </React.Fragment>
  );
};

export default App;
