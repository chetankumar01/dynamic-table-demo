import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';

export default function configureStore() {
  const store = createStore(reducer, {}, compose(applyMiddleware(...[])));
  return store;
}
