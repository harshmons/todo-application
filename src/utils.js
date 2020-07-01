import { List, Map } from 'immutable';

const moveTask = (taskListId, taskId, newTaskListId, state) => {
  // Finding TaskList index
  const taskListIndex = state.findIndex(val => val.get('id') === taskListId);

  // Finding new TaskList index
  const newTaskListIndex = state.findIndex(
    val => val.get('id') === newTaskListId
  );

  // Finding Task
  const task = state
    .getIn([taskListIndex, 'taskList'])
    .find(val => val.get('id') === taskId);

  // Deleting task from previous TaskList and pushing it to new TaskList
  return state
    .updateIn([taskListIndex, 'taskList'], list =>
      list.filter(val => val.get('id') !== taskId)
    )
    .updateIn([newTaskListIndex, 'taskList'], list => list.push(task));
};

const moveTaskList = (taskListId, newTaskListId, state) => {
  // Finding TaskList index
  const taskListIndex = state.findIndex(val => val.get('id') === taskListId);

  // Finding new TaskList index
  const newTaskListIndex = state.findIndex(
    val => val.get('id') === newTaskListId
  );

  // Storing TaskList
  const taskList = state.get(taskListIndex);

  return state.delete(taskListIndex).insert(newTaskListIndex, taskList);
};

const addTaskList = (name, state) => {
  return state.push(
    Map({
      name,
      id: new Date().getTime(),
      taskList: List([]),
    })
  );
};

const deleteTaskList = (taskId, state) => {
  return state.filter(val => val.get('id') !== taskId);
};

const updateTaskListName = (taskListId, taskListName, state) => {
  const taskListIndex = state.findIndex(val => val.get('id') === taskListId);
  return state.setIn([taskListIndex, 'name'], taskListName);
};

const addTask = (taskName, taskListId, state) => {
  const taskListIndex = state.findIndex(val => val.get('id') === taskListId);
  return state.updateIn([taskListIndex, 'taskList'], list =>
    list.push(
      Map({
        name: taskName,
        id: new Date().getTime(),
      })
    )
  );
};

const updateTaskName = (taskListId, taskId, taskName, state) => {
  const taskListIndex = state.findIndex(val => val.get('id') === taskListId);
  return state.updateIn([taskListIndex, 'taskList'], list => {
    const taskIndex = list.findIndex(task => task.get('id') === taskId);
    return list.setIn([taskIndex, 'name'], taskName);
  });
};

const deleteTask = (taskListId, taskId, state) => {
  const taskListIndex = state.findIndex(val => val.get('id') === taskListId);
  return state.updateIn([taskListIndex, 'taskList'], list =>
    list.filter(val => val.get('id') !== taskId)
  );
};

export {
  moveTask,
  addTaskList,
  deleteTaskList,
  addTask,
  deleteTask,
  updateTaskListName,
  updateTaskName,
  moveTaskList,
};
