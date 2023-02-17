import { useEffect, useState } from 'react';
import { useDataContext } from '../contexts/DataContext';

const useWindowSize = () => {
  const {
    windowSize,
    setWindowSize,

    gridSize,
    setGridSize,
  } = useDataContext();
  useEffect(() => {
    const determineSquareSize = () => {
      let squareCompare = [window.innerHeight, window.innerWidth];

      let shorterSide = squareCompare.sort((a, b) => a - b)[0];
      let padding = shorterSide * 0.2; //20% of shorter side
      let squareSize = (shorterSide - padding) / gridSize.col;
      return squareSize;
    };

    setGridSize({
      ...gridSize,
      square: determineSquareSize(),
    });

    const handleResize = () => {
      setGridSize({
        ...gridSize,
        square: determineSquareSize(),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gridSize.row]);
  return <div>useWindowSize</div>;
};
export default useWindowSize;
