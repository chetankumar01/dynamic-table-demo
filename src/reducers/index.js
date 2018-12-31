import { combineReducers } from 'redux';
import tables from './tablesReducer';

const appReducer = combineReducers({
  tables,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
