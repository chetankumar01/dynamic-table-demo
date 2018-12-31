import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';

export default function configureStore() {
  const store = createStore(
    reducer,
    {},
    compose(
      applyMiddleware(...[]),
      window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );
  return store;
}
