import { combineReducers } from 'redux-immutable';
import TaskListReducer from './TaskListReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
  taskList: TaskListReducer,
  modal: ModalReducer,
});
