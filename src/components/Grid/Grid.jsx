import React, { useEffect } from 'react';
import { useDataContext } from '../../contexts/DataContext';
import { Node } from '..';
import { useWindowSize } from '../../hooks';

function Grid() {
  useWindowSize();

  const { gridSize, grid, setGrid } = useDataContext();

  const generateGrid = () => {
    const rows = [...Array(gridSize.row).keys()];
    const columns = [...Array(gridSize.col).keys()];

    const arrayOfArray = rows.map(() => columns);

    let count = 0;

    const x = rows.map((row) =>
      arrayOfArray[row].map((col) => {
        count += 1;
        return <Node key={count - 1} name={count - 1} row={row} col={col} />;
      })
    );
    return x;
  };

  useEffect(() => {
    setGrid(generateGrid());
  }, [gridSize, setGrid]);

  return (
    <div
      style={{
        width: `${gridSize.square * gridSize.col}px`,
        height: `${gridSize.square * gridSize.row}px`,
      }}
      className="flex flex-wrap select-none"
    >
      {grid}
    </div>
  );
}
export default Grid;
