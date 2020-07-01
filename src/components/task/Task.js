import React from 'react';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './Task.styles';

const drag = (taskId, taskListId, e) => {
  e.dataTransfer.setData(
    'dragTask',
    JSON.stringify({ type: 'task', taskId, taskListId })
  );
  e.stopPropagation();
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
      <EditIcon
        onClick={actions.editTaskNameHandler.bind(
          null,
          taskListId,
          task.id,
          task.name
        )}
        className={classes.icon}
      />
      <DeleteIcon
        onClick={actions.deleteTaskHandler.bind(
          null,
          taskListId,
          task.id,
          task.name
        )}
        className={classes.icon}
      />
    </div>
  );
};

export default Task;
