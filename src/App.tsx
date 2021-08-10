import React from 'react';
import { Provider as HomeProvider } from './context/Home';
import './App.scss';
import AppRouter from './navigations/Routers';

function App() {
  return (
    <HomeProvider>
      <AppRouter />
    </HomeProvider>
  );
}

export default App;
