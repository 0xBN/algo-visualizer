import { useEffect } from 'react';

import { useDataContext } from '../contexts/DataContext';
import { useNode } from '.';

const useAStar = () => {
  const {
    origin,
    setMessage,
    target,
    grid,
    checkedNodes,
    setCheckedNodes,
    node,
    childMap,
    isWall,
    foundTarget,
    isTarget,
    noChildrenFound,
  } = useDataContext();

  const getChildrenOf = (node) => {
    const children = [
      'topChild',
      'bottomChild',
      'leftChild',
      'rightChild',
      'topLeftChild',
      'topRightChild',
      'bottomLeftChild',
      'bottomRightChild',
    ];

    const allChildren = children
      .map((child) => generateChild(child, node))
      .filter((child) => child?.name !== null);

    return allChildren;
  };

  const generateChild = (child, parent) => {
    if (!parent || !child) return;
    const row = parent.row + childMap[child].row;
    const col = parent.col + childMap[child].col;

    const gCost = parent.gCost + calcCost(row, col, parent);
    const hCost = calcCost(row, col, target);
    const fCost = Number((gCost + hCost).toFixed());

    // ACCOUNT FOR OUT OF BOUND CHILDREN
    if (
      row < 0 ||
      col < 0 ||
      row >= grid?.length ||
      col >= grid[0]?.length ||
      isNaN(row) ||
      isNaN(col)
    ) {
      return { ...node };
    }

    const name =
      Number(
        grid[parent.row + childMap[child].row][parent.col + childMap[child].col]
          .key
      ) || undefined;

    const childNode = {
      ...node,
      name,
      row,
      col,
      gCost,
      hCost,
      fCost,
      parent,
      isVisited: true,
    };

    if (isWall(childNode)) return { ...node };

    return childNode;
  };
  const runCheckNodes = () => {
    const children = getChildrenOf(origin);
    if (children.length === 0) return noChildrenFound();

    const targetExists = children.find((child) => isTarget(child));
    if (targetExists) return foundTarget(targetExists);

    setCheckedNodes([...checkedNodes, ...children]);
    return 0;
  };

  const calcCost = (row, col, toNode) => {
    const yDistance = Math.abs(toNode.row - row) * 10;
    const xDistance = Math.abs(toNode.col - col) * 10;
    const sumOfSquares = yDistance ** 2 + xDistance ** 2;

    const num = Number(Math.sqrt(sumOfSquares).toFixed());
    return num;
  };

  return { runCheckNodes, getChildrenOf };
};
export default useAStar;
