import { useEffect } from 'react';
import { useDataContext } from '../contexts/DataContext';
import { useAStar } from '../hooks';

const useNode = () => {
  const {
    setWalls,
    walls,
    setOrigin,
    setTarget,
    checkedNodes,
    isOrigin,
    isTarget,
    isWall,
    isChecked,
    isCheckedByName,
    getCheckedNodeByName,
    closedNodes,
    setClosedNodes,
    target,
    addToClosedNodes,
    isClosed,
    foundTarget,
    setCheckedNodes,
    noChildrenFound,
    nextNode,
    setNextNode,
    targetFound,
  } = useDataContext();

  const { getChildrenOf } = useAStar();

  const setUniqueWalls = (node) => {
    if (isOrigin(node) || isTarget(node) || !!checkedNodes.length) return;

    const { name, row, col } = node;
    const wall = { ...node, name, row, col };

    if (isWall(node)) return;

    setWalls(() => [...walls, wall]);
  };

  const toggleWallOff = (node) => {
    if (!isWall(node)) return;
    const newWalls = [...walls].filter((wall) => node.name !== wall.name);
    setWalls(newWalls);
  };

  const setUniqueOrigin = (node) => {
    if (isTarget(node)) {
      console.log(target);
    }
    if (isWall(node) || isTarget(node) || !!checkedNodes.length) return;
    setOrigin(node);
  };

  const setUniqueTarget = (node) => {
    if (isWall(node) || isOrigin(node) || !!checkedNodes.length) return;
    setTarget(node);
  };

  const stepThroughNode = (node) => {
    if (isWall(node) || isOrigin(node) || isTarget(node)) return;
    addToClosedNodes(node);

    let children = getChildrenOf(node);
    // console.log(children);

    // FILTER OUT TARGET, ORIGIN, WALL, CHECKED, CLOSED NODES
    let newChildren = children.filter((child) => {
      if (isTarget(child)) {
        foundTarget(child);
        return;
      }
      if (isOrigin(child) || isWall(child) || isClosed(child)) return;
      return child;
    });

    setCheckedNodes([...checkedNodes, ...newChildren]);
  };

  useEffect(() => {
    let sortedFCost = checkedNodes?.sort((a, b) => {
      if (a.fCost === b.fCost) return a.hCost - b.hCost;
      return a.fCost - b.fCost;
    });
    // Filter out closed nodes
    let filterClosed = sortedFCost?.filter((node) => {
      if (!node.name) return;
      if (isClosed(node)) return;
      return node;
    });

    let lowestFScoreNode = filterClosed[0];

    if (!targetFound) {
      setNextNode(lowestFScoreNode);
    }
  }, [checkedNodes, nextNode]);

  return {
    setUniqueWalls,
    toggleWallOff,
    setUniqueOrigin,
    setUniqueTarget,
    stepThroughNode,
  };
};
export default useNode;
