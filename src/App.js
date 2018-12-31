import React from 'react';
import { Provider } from 'react-redux';
import TableList from './TableList';
import configureStore from './store';

const store = configureStore();

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <TableList />
      </Provider>
    );
  }
}

export default App;
