import React from 'react';
import VirtualizedList from 'react-virtualized/dist/es/List';
import WindowScroller from 'react-virtualized/dist/es/WindowScroller';
import { v4 } from 'uuid';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../store';
import { setSelected, removeSelection } from '../store/app/slice';

export const List: React.FC = () => {
  const dispatch = useAppDispatch();
  const elements = useAppSelector((state) => state.app.elements);
  const selectedElements = useAppSelector(
    (state) => state.app.selectedElements
  );

  const toggleSelection = (index: number): void => {
    if (!selectedElements.includes(index)) {
      dispatch(setSelected(index));
    } else {
      dispatch(removeSelection(index));
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
