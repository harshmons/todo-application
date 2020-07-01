import React from 'react';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import {
  draggedTask,
  addTask,
  deleteTaskList,
  editTaskListName,
  draggedTaskList,
} from '../../store/actions';

const TaskListContainer = props => <TaskList {...props} />;

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      addTaskHandler: taskListId => dispatch(addTask(taskListId)),
      editTaskNameHandler: (taskListId, taskListName) =>
        dispatch(editTaskListName(taskListId, taskListName)),
      deleteTaskListHandler: (taskName, taskId) =>
        dispatch(deleteTaskList(taskName, taskId)),
      draggedTaskHandler: ({ type, ...rest }) => {
        if (type === 'task') {
          const { taskListId, taskId, newTaskListId } = rest;
          dispatch(draggedTask(taskListId, taskId, newTaskListId));
        } else {
          const { taskListId, newTaskListId } = rest;
          dispatch(draggedTaskList(taskListId, newTaskListId));
        }
      },
    },
  };
};
export default connect(null, mapDispatchToProps)(TaskListContainer);
