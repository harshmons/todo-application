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

const mapStateToProps = state => {
  const taskLists = state.get('taskLists');
  return {
    taskLists: taskLists.get('taskLists').toJS(),
    fetching: taskLists.get('fetching'),
    error: taskLists.get('error'),
  };
};

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
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
