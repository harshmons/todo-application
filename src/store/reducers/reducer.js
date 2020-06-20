import { combineReducers } from 'redux-immutable';
import taskListsReducer from './taskListsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  taskLists: taskListsReducer,
  modal: modalReducer,
});
