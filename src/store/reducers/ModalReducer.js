import { Map } from 'immutable';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_TASK_LIST_SUCCESS,
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  DELETE_TASK_LIST_SUCCESS,
} from '../action_types';

export const DEFAULT_STATE = Map({
  show: false,
  title: '',
  message: '',
  showNameInput: true,
  showDescriptionInput: true,
  primaryActionName: '',
  primaryActionCallback: null,
  secondaryActionName: '',
  secondaryActionCallback: null,
});

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      const { payload } = action;
      return state.merge({
        show: true,
        ...payload,
      });
    }
    case ADD_TASK_LIST_SUCCESS:
    case ADD_ITEM_SUCCESS:
    case DELETE_TASK_LIST_SUCCESS:
    case DELETE_ITEM_SUCCESS:
    case HIDE_MODAL:
      return DEFAULT_STATE;
    default:
      return state;
  }
}
