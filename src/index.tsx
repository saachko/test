import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './App';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);
