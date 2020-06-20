import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import ModalContainer from './ModalContainer';
import Modal from './Modal';
import { HIDE_MODAL } from '../../store/action_types';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const getSetup = () => {
  const initialState = Map({
    modal: Map({
      show: false,
      title: 'Sample Title',
      message: 'Sample Message',
      showNameInput: false,
      primaryActionName: 'Sample Primary Action Name',
      secondaryActionName: 'Sample Secondary Action Name',
      primaryActionCallback: () => {},
      secondaryActionCallback: () => {},
    }),
  });
  const store = mockStore(initialState);
  const wrapper = shallow(<ModalContainer store={store} />);
  const enzymeWrapper = wrapper.dive().dive();
  return {
    enzymeWrapper,
    store,
  };
};

describe('<HeaderContainer />', () => {
  const { enzymeWrapper, store } = getSetup();
  it('should render <Modal />', () => {
    expect(enzymeWrapper.type()).toBe(Modal);
  });

  describe('mapDispatchToProps', () => {
    const mockActionType = 'MOCK_TYPE';
    const mockCallbackAction = () => ({
      type: mockActionType,
    });

    beforeEach(() => {
      store.clearActions();
    });

    it('should dispatch HIDE_MODAL action when `action.hideModal`  is called', () => {
      enzymeWrapper.prop('actions').hideModal();
      expect(store.getActions()).toStrictEqual([{ type: HIDE_MODAL }]);
    });

    it('should dispatch MOCK_TYPE action when `action.primaryActionHandler` is called with `mockCallbackAction` as an argument', () => {
      enzymeWrapper.prop('actions').primaryActionHandler(mockCallbackAction);
      expect(store.getActions()).toStrictEqual([{ type: mockActionType }]);
    });

    it('should dispatch nothing when `action.primaryActionHandler` is called with empty argument', () => {
      enzymeWrapper.prop('actions').primaryActionHandler();
      expect(store.getActions()).toStrictEqual([]);
    });

    it('should dispatch MOCK_TYPE action when `action.secondaryActionHandler` is called with `mockCallbackAction` as an argument', () => {
      enzymeWrapper.prop('actions').secondaryActionHandler(mockCallbackAction);
      expect(store.getActions()).toStrictEqual([{ type: mockActionType }]);
    });

    it('should dispatch nothing action when `action.secondaryActionHandler` is called with empty argument', () => {
      enzymeWrapper.prop('actions').secondaryActionHandler();
      expect(store.getActions()).toStrictEqual([]);
    });
  });
});
