import React from 'react';
import VirtualizedList from 'react-virtualized/dist/es/List';
import WindowScroller from 'react-virtualized/dist/es/WindowScroller';
import { v4 } from 'uuid';
import { useAppSelector } from '../store';

export const List: React.FC = () => {
  const elements = useAppSelector((state) => state.app.elements);

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
              <li className="list__item" key={v4()} style={style}>
                {elements[index]}
              </li>
            );
          }}
        />
      )}
    </WindowScroller>
  );
};
