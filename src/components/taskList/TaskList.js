import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TaskContainer from '../task/TaskContainer';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from './TaskList.styles';

const allowDrop = e => {
  e.preventDefault();
};
const drop = (newTaskListId, callback, e) => {
  const { taskListId, taskId } = JSON.parse(e.dataTransfer.getData('task'));
  if (taskListId === newTaskListId) return;
  callback(taskListId, taskId, newTaskListId);
};

const Task = props => {
  const { taskList, actions } = props;
  const classes = useStyles();
  return (
    <div
      onDragOver={allowDrop}
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
          title={taskList.name}
          classes={{
            content: classes.cardHeaderContent,
            title: classes.cardHeaderTitle,
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
