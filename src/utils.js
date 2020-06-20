import { List, Map } from 'immutable';

const moveTaskToAnotherTaskList = (
  prevTaskListId,
  taskId,
  newTaskListId,
  state
) => {
  let prevTaskIndex = 0;
  const prevTask = state.get('taskLists').find((val, index) => {
    if (val.get('id') === prevTaskListId) {
      prevTaskIndex = index;
      return true;
    }
    return false;
  });

  let newTaskIndex = 0;
  state.get('taskLists').find((val, index) => {
    if (val.get('id') === newTaskListId) {
      newTaskIndex = index;
      return true;
    }
    return false;
  });

  let taskIndexOnPrevTaskList = 0;
  const task = prevTask.get('taskList').find((val, index) => {
    if (val.get('id') === taskId) {
      taskIndexOnPrevTaskList = index;
      return true;
    }
    return false;
  });

  const newTaskList = state
    .getIn(['taskLists', newTaskIndex, 'taskList'])
    .push(task);
  const newState = state
    .deleteIn(['taskLists', prevTaskIndex, 'taskList', taskIndexOnPrevTaskList])
    .setIn(['taskLists', newTaskIndex, 'taskList'], newTaskList);

  return newState;
};

const addNewTaskInTaskList = (name, state) => {
  return state.push(
    Map({
      name,
      id: new Date().getTime(),
      taskList: List([]),
    })
  );
};

const deleteTaskList = (taskId, state) => {
  const taskIndex = state.findIndex(val => val.get('id') === taskId);
  return state.delete(taskIndex);
};

const addTaskInATaskList = (name, taskId, state) => {
  let taskIndex = 0;
  const task = state
    .find((val, index) => {
      if (val.get('id') === taskId) {
        taskIndex = index;
        return true;
      }
      return false;
    })
    .get('taskList')
    .push(
      Map({
        name,
        id: new Date().getTime(),
      })
    );
  return state.setIn([taskIndex, 'taskList'], task);
};

const deleteTask = (taskListId, taskId, state) => {
  let taskIndex = 0;
  const task = state.find((val, index) => {
    if (val.get('id') === taskListId) {
      taskIndex = index;
      return true;
    }
    return false;
  });

  const updatedTask = task
    .get('taskList')
    .filter(val => val.get('id') !== taskId);
  return state.setIn([taskIndex, 'taskList'], updatedTask);
};

export {
  moveTaskToAnotherTaskList,
  addNewTaskInTaskList,
  addTaskInATaskList,
  deleteTaskList,
  deleteTask,
};
