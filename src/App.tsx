import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './store';
import { loadData } from './store/app/thunks';

import { List } from './components/List';
import { Loader } from './components/Loader';
import { ClearButton } from './components/ClearButton';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector((state) => state.app.isDataLoaded);

  useEffect(() => {
    dispatch(loadData()).unwrap();
  }, []);

  return (
    <>
      {isDataLoaded ? (
        <>
          <List />
          <ClearButton />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
