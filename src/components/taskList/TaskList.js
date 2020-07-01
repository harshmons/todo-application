import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import TaskContainer from '../task';
import useStyles from './TaskList.styles';

const allowDrop = e => {
  e.preventDefault();
};

const drop = (newTaskListId, callback, e) => {
  const { type, taskListId, ...rest } = JSON.parse(
    e.dataTransfer.getData('dragTask')
  );

  if (taskListId === newTaskListId) return;

  if (type === 'task') {
    const { taskId } = rest;
    callback({ type, taskListId, taskId, newTaskListId });
  } else {
    callback({ type, taskListId, newTaskListId });
  }
};

const drag = (taskListId, e) => {
  e.dataTransfer.setData(
    'dragTask',
    JSON.stringify({ type: 'taskList', taskListId })
  );
};

const Task = props => {
  const { taskList, actions } = props;
  const classes = useStyles();
  return (
    <div
      onDragOver={allowDrop}
      draggable
      onDragStart={drag.bind(null, taskList.id)}
      onDrop={drop.bind(null, taskList.id, actions.draggedTaskHandler)}
      className={classes.root}
    >
      <Card>
        <CancelIcon
          className={classes.cancel}
          onClick={actions.deleteTaskListHandler.bind(
            null,
            taskList.name,
            taskList.id
          )}
        />
        <CardHeader
          title={
            <React.Fragment>
              <span className={classes.cardHeaderTitleText}>
                {taskList.name}
              </span>
              <EditIcon
                className={classes.edit}
                onClick={actions.editTaskNameHandler.bind(
                  null,
                  taskList.id,
                  taskList.name
                )}
              />
            </React.Fragment>
          }
          classes={{
            content: classes.cardHeaderContent,
            title: classes.cardHeaderTitleRoot,
          }}
        />
        <CardContent className={classes.cardContent}>
          {taskList.taskList.map(task => {
            return (
              <TaskContainer
                key={task.id}
                task={task}
                taskListId={taskList.id}
              />
            );
          })}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={actions.addTaskHandler.bind(null, taskList.id)}
          >
            <u>Add a task</u>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Task;
