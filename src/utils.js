import { List, Map } from 'immutable';

const swapItem = (prevTaskId, prevItemId, newTaskId, state) => {
  let prevTaskIndex = 0;
  const prevTask = state.get('taskList').find((val, index) => {
    if (val.get('id') === prevTaskId) {
      prevTaskIndex = index;
      return true;
    }
    return false;
  });

  let newTaskIndex = 0;
  state.get('taskList').find((val, index) => {
    if (val.get('id') === newTaskId) {
      newTaskIndex = index;
      return true;
    }
    return false;
  });

  let itemIndexOnPrevTask = 0;
  const item = prevTask.get('items').find((val, index) => {
    if (val.get('id') === prevItemId) {
      itemIndexOnPrevTask = index;
      return true;
    }
    return false;
  });

  const newItemList = state
    .getIn(['taskList', newTaskIndex, 'items'])
    .push(item);
  const newState = state
    .deleteIn(['taskList', prevTaskIndex, 'items', itemIndexOnPrevTask])
    .setIn(['taskList', newTaskIndex, 'items'], newItemList);

  return newState;
};

const addNewTaskInTaskList = (name, description, state) => {
  return state.push(
    Map({
      name,
      id: new Date().getTime(),
      description,
      items: List([]),
    })
  );
};

const deleteTaskFromTaskList = (taskId, state) => {
  const taskIndex = state.findIndex(val => val.get('id') === taskId);
  return state.delete(taskIndex);
};

const addItemInATask = (name, taskId, state) => {
  let taskIndex = 0;
  const task = state
    .find((val, index) => {
      if (val.get('id') === taskId) {
        taskIndex = index;
        return true;
      }
      return false;
    })
    .get('items')
    .push(
      Map({
        name,
        id: new Date().getTime(),
      })
    );
  return state.setIn([taskIndex, 'items'], task);
};

const deleteItemFromATask = (taskId, itemId, state) => {
  let taskIndex = 0;
  const task = state.find((val, index) => {
    if (val.get('id') === taskId) {
      taskIndex = index;
      return true;
    }
    return false;
  });

  const updatedTask = task.get('items').filter(val => val.get('id') !== itemId);
  return state.setIn([taskIndex, 'items'], updatedTask);
};

export {
  swapItem,
  addNewTaskInTaskList,
  addItemInATask,
  deleteTaskFromTaskList,
  deleteItemFromATask,
};
