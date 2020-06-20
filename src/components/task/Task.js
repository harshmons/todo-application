import React from 'react';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './Task.styles';

const drag = (taskId, taskListId, e) => {
  e.dataTransfer.setData('task', JSON.stringify({ taskId, taskListId }));
};

const Task = props => {
  const { task, taskListId, actions } = props;
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      draggable
      onDragStart={drag.bind(null, task.id, taskListId)}
    >
      <Typography variant="body2" color="textPrimary" className={classes.task}>
        {task.name}
      </Typography>
      <DeleteIcon
        onClick={actions.deleteTaskHandler.bind(
          null,
          taskListId,
          task.id,
          task.name
        )}
        className={classes.delete}
      />
    </div>
  );
};

export default Task;
