import { List, Map } from 'immutable';

const moveTask = (prevTaskListId, taskId, newTaskListId, state) => {
  // Finding previous TaskList index
  const prevTaskListIndex = state.findIndex(
    val => val.get('id') === prevTaskListId
  );

  // Finding new TaskList index
  const newTaskListIndex = state.findIndex(
    val => val.get('id') === newTaskListId
  );

  // Finding Task
  const task = state
    .getIn([prevTaskListIndex, 'taskList'])
    .find(val => val.get('id') === taskId);

  // Deleting task from previous TaskList and pushing it to new TaskList
  return state
    .updateIn([prevTaskListIndex, 'taskList'], list =>
      list.filter(val => val.get('id') !== taskId)
    )
    .updateIn([newTaskListIndex, 'taskList'], list => list.push(task));
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

const deleteTask = (taskListId, taskId, state) => {
  const taskListIndex = state.findIndex(val => val.get('id') === taskListId);
  return state.updateIn([taskListIndex, 'taskList'], list =>
    list.filter(val => val.get('id') !== taskId)
  );
};

export { moveTask, addTaskList, deleteTaskList, addTask, deleteTask };
