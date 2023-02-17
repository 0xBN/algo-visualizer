import { useState, useMemo, useEffect } from 'react';
import * as Constants from '../../constants';
import { useDataContext } from '../../contexts/DataContext';
import { useNode, useAStar } from '../../hooks';
import { NodeLabel } from '..';

const Node = ({ name, row, col }) => {
  const {
    grid,
    gridSize,
    objSelector,
    origin,
    target,
    walls,
    isMouseDown,
    setIsMouseDown,
    node,
    checkedNodes,
    isChecked,
    isOrigin,
    isTarget,
    isWall,
    isClosed,
    getCheckedNode,
    closedNodes,
    isNextNode,
    isRoad,
    nodeFromCoord,
  } = useDataContext();

  const {
    setUniqueWalls,
    toggleWallOff,
    setUniqueOrigin,
    setUniqueTarget,
    stepThroughNode,
  } = useNode();

  // START NODE STYLES
  const isOriginStyle = isOrigin(name) && 'bg-[#289BC0]';
  const isTargetStyle = isTarget(name) && 'bg-[#289BC0]';
  const isWallStyle = isWall(name) && 'bg-black';
  const isCheckedStyle =
    isChecked(name) &&
    !isClosed(name) &&
    'bg-[#69C209] transition-all duration-500';
  const isClosedStyle = isClosed(name) && !isRoad(name) && 'bg-red-500';
  const isNextNodeStyle = isNextNode(name) && 'bg-pink-500 animate-pulse';
  const isRoadStyle = isRoad(name) && 'bg-yellow-300';
  const isEmptyStyle =
    !isOriginStyle &&
    !isTargetStyle &&
    !isWallStyle &&
    !isCheckedStyle &&
    !isClosedStyle &&
    !isRoadStyle &&
    'hover:bg-slate-900 bg-slate-300';
  // END NODE STYLES

  // TEMPORARY USEEFFECT TO SELECT ORIGIN AND TARGET AT LOAD
  // useEffect(() => {
  //   const tempOrigin = nodeFromCoord(0, 0);
  //   const tempTarget = nodeFromCoord(4, 6);
  //   setUniqueOrigin(tempOrigin);
  //   setUniqueTarget(tempTarget);
  // }, []);

  const handleSelectNode = () => {
    if (objSelector === 'origin') setUniqueOrigin(nodeFromCoord(row, col));
    if (objSelector === 'target') setUniqueTarget(nodeFromCoord(row, col));
    if (objSelector === 'wall') toggleWallOff(nodeFromCoord(row, col));
    if (objSelector === 'stepThrough') {
      if (!isChecked(name)) return;
      stepThroughNode(getCheckedNode(name));
    }
  };

  const handleMouseDown = () => {
    if (objSelector !== 'wall') return;
    setIsMouseDown(true);
    setUniqueWalls(nodeFromCoord(row, col));
  };

  const handleMouseOver = () => {
    if (!isMouseDown) return;
    setUniqueWalls(nodeFromCoord(row, col));
  };

  const handleMouseUp = () => setIsMouseDown(false);

  // SEARCH CHECKED LIST AND FILTER OUT gCOST, hCOST

  let gCost;
  let hCost;
  let fCost;
  const getCalculations = () => {
    if (checkedNodes?.length === 0) return;

    if (isCheckedStyle || isClosedStyle || isRoadStyle) {
      ({ gCost, hCost, fCost } = checkedNodes?.filter(
        (node) => node?.name === name
      )[0]);
    }
  };

  getCalculations();

  return (
    <div
      onClick={handleSelectNode}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseUp={handleMouseUp}
      style={{
        width: `${gridSize.square}px`,
        height: `${gridSize.square}px`,
      }}
      className={`border border-black/50 cursor-pointer relative ${isOriginStyle} ${isTargetStyle} ${isWallStyle} ${isEmptyStyle} ${isCheckedStyle} ${isClosedStyle} ${isNextNodeStyle} ${isRoadStyle}  transition-all duration-200`}
    >
      <NodeLabel type="nodeName" label={name} />

      {!isOrigin(name) && !isTarget(name) && !isWall(name) && (
        <>
          <NodeLabel type="g" value={gCost} />
          <NodeLabel type="h" value={hCost} />
          <NodeLabel type="f" value={fCost} />
        </>
      )}

      <NodeLabel type="origin" label={name === origin?.name && 'A'} />
      <NodeLabel type="target" label={name === target?.name && 'B'} />
    </div>
  );
};
export default Node;
