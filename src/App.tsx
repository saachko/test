import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { loadData } from './store/app/thunks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector((state) => state.app.isDataLoaded);

  useEffect(() => {
    dispatch(loadData()).unwrap();
  }, []);

  return <>
    <p>{isDataLoaded ? 'Done' : 'Loading'}</p>
  </>;
};
