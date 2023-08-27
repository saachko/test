import React from 'react';

import { useAppDispatch } from '../store';
import { removeAllSelections } from '../store/app/slice';

export const ClearButton: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="button_clear"
      type="button"
      onClick={() => dispatch(removeAllSelections())}
    >
      Clear All
    </button>
  );
};
