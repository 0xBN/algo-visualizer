import { useState } from 'react';
import { Header, Grid, HelpMessage, GridSettings } from './components';
import { useDataContext } from './contexts/DataContext';
import * as Constants from './constants';
import { useLocalStorage } from './hooks';

function App() {
  return (
    <div className='bg-slate-700 text-white min-h-screen flex w-full'>
      <div className={` `}>
        <Header />
      </div>
      <div
        className={`min-w-full grid place-content-center sm:min-w-fit sm:flex sm:self-center sm:ml-10`}
      >
        <HelpMessage />
        <Grid />
      </div>
    </div>
  );
}

export default App;
