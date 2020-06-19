import React from 'react';
import Grid from '@material-ui/core/Grid';
import Task from '../task/Task';

const TaskList = props => {
  const { list, actions } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {list.map(item => {
          return (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Task
                detail={item}
                onAddItem={actions.addItemHandler}
                onDraggedItem={actions.draggedItemHandler}
                onDeleteTask={actions.deleteTaskHandler}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default TaskList;
