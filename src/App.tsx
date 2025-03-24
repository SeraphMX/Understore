import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { store } from './store/store';
import AppRoutes from './routes';

function App() {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </NextUIProvider>
  );
}

export default App;