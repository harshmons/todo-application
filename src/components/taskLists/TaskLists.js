import React from 'react';
import Grid from '@material-ui/core/Grid';
import TaskListContainer from '../taskList';

const TaskLists = props => {
  const { taskLists } = props;
  return (
    <Grid container spacing={3}>
      {taskLists.map(taskList => (
        <Grid item key={taskList.id} xs={12} sm={6} md={3}>
          <TaskListContainer taskList={taskList} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskLists;
