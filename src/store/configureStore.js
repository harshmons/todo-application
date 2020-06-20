import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default () => {
  const middleware = applyMiddleware(thunk);
  const store = createStore(reducer, composeWithDevTools(middleware));
  return store;
};
