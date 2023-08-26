import React, { useState, useEffect } from 'react';
import VirtualizedList from 'react-virtualized/dist/es/List';
import WindowScroller from 'react-virtualized/dist/es/WindowScroller';
import { v4 } from 'uuid';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../store';
import {
  setSelected,
  setMultiSelected,
  removeSelection
} from '../store/app/slice';

export const List: React.FC = () => {
  const [isShiftPressed, setShiftPressed] = useState(false);

  const dispatch = useAppDispatch();
  const elements = useAppSelector((state) => state.app.elements);
  const selectedElements = useAppSelector(
    (state) => state.app.selectedElements
  );
  const previousSelected = useAppSelector(
    (state) => state.app.previousSelected
  );

  const toggleSelection = (index: number): void => {
    if (!selectedElements.includes(index)) {
      if (isShiftPressed) {
        multiSelect(index);
      }
      dispatch(setSelected(index));
    } else {
      dispatch(removeSelection(index));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', () => setShiftPressed(true));
    document.addEventListener('keyup', () => setShiftPressed(false));
  }, []);

  const multiSelect = (currentIndex: number): void => {
    if (previousSelected) {
      const max = Math.max(currentIndex, previousSelected);
      const min = Math.min(currentIndex, previousSelected);
      const indexes = [];
      for (let i = min; i <= max; i++) {
        indexes.push(i);
      }
      dispatch(setMultiSelected(indexes));
    }
  };

  return (
    <WindowScroller>
      {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
        <VirtualizedList
          autoHeight
          width={width}
          height={height}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          innerElementType="ul"
          rowCount={elements.length}
          rowHeight={35}
          className="list"
          scrollTop={scrollTop}
          rowRenderer={({ index, style }) => {
            return (
              <li
                className={clsx('list__item', {
                  selected: selectedElements.includes(index)
                })}
                key={v4()}
                style={style}
                onClick={() => toggleSelection(index)}
              >
                {elements[index]}
              </li>
            );
          }}
        />
      )}
    </WindowScroller>
  );
};
