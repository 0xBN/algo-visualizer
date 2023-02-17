import { createContext, useState, useContext, useEffect } from 'react';
import { useNode } from '../hooks';
import * as Constants from '../constants';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(Constants.GRID_SIZE_INITIAL);

  const [objSelector, setObjSelector] = useState('origin');

  const [count, setCount] = useState(10);
  const [searchMode, setSearchMode] = useState('Dijkstra');

  const [node, setNode] = useState({
    name: null,
    row: null,
    col: null,
    parent: {},
    // children: [],
    // isVisited: false,
    // isRoad: false,
    gCost: 0,
    hCost: 0,
  });

  const [origin, setOrigin] = useState({
    name: null,
    row: null,
    col: null,
    parent: {},
    children: [],
    isVisited: false,
    isRoad: false,
    gCost: 0,
    hCost: 0,
  });
  const [target, setTarget] = useState({
    name: null,
    row: null,
    col: null,
    parent: {},
    // children: [],
    // isVisited: false,
    // isRoad: false,
    gCost: 0,
    hCost: 0,
  });
  const [targetFound, setTargetFound] = useState(false);
  const [isRunningAlgo, setIsRunningAlgo] = useState(false);

  const [walls, setWalls] = useState([]);
  const [checkedNodes, setCheckedNodes] = useState([]);
  const [openNodes, setOpenNodes] = useState([]);
  const [closedNodes, setClosedNodes] = useState([]);
  const [road, setRoad] = useState([]);

  const [currentNode, setCurrentNode] = useState({});
  const [nextNode, setNextNode] = useState({});

  // DISPLAY STATES
  const [showNodeName, setShowNodeName] = useState(false);
  const [showFCost, setShowFCost] = useState(false);
  const [showGCost, setShowGCost] = useState(false);
  const [showHCost, setShowHCost] = useState(false);
  const [windowSize, setWindowSize] = useState();
  const [message, setMessage] = useState('');

  // COMPONENTS
  const objectSelectorButtons = ['origin', 'target', 'wall'];
  const settingSliders = [
    {
      label: 'Dimension',
      min: Constants.COL_COUNT_MIN,
      max: Constants.COL_COUNT_MAX,
      value: gridSize.col,
    },
  ];

  const childMap = {
    topChild: { row: -1, col: 0, gCost: 10, hCost: 0, fCost: 0 },
    bottomChild: { row: 1, col: 0, gCost: 10, hCost: 0, fCost: 0 },
    leftChild: { row: 0, col: -1, gCost: 10, hCost: 0, fCost: 0 },
    rightChild: { row: 0, col: 1, gCost: 10, hCost: 0, fCost: 0 },

    topLeftChild: { row: -1, col: -1, gCost: 14, hCost: 0, fCost: 0 },
    topRightChild: { row: -1, col: 1, gCost: 14, hCost: 0, fCost: 0 },
    bottomLeftChild: { row: 1, col: -1, gCost: 14, hCost: 0, fCost: 0 },
    bottomRightChild: { row: 1, col: 1, gCost: 14, hCost: 0, fCost: 0 },
  };

  const normalizeNode = (searchType, search) => {
    if (typeof searchType === 'object') search = searchType?.name;
    if (typeof searchType === 'number') search = searchType;
    return search;
  };

  const nodeFromCoord = (row, col) => {
    if (row > grid || col > grid) return 'Grid too small';
    return {
      ...node,
      name: Number(grid[row][col]?.key),
      row,
      col,
    };
  };

  const isOrigin = (nodeOrName) => origin.name === normalizeNode(nodeOrName);
  const isTarget = (nodeOrName) => target.name === normalizeNode(nodeOrName);
  const isNextNode = (nodeOrName) =>
    nextNode?.name === normalizeNode(nodeOrName);

  const isWall = (nodeOrName) =>
    walls.find((wall) => wall.name === normalizeNode(nodeOrName));

  const isRoad = (nodeOrName) =>
    road?.find((node) => node?.name === normalizeNode(nodeOrName));

  const isChecked = (nodeOrName) =>
    checkedNodes.find(
      (singleNode) => singleNode.name === normalizeNode(nodeOrName)
    );

  const isClosed = (nodeOrName) =>
    closedNodes.find(
      (singleNode) => singleNode?.name === normalizeNode(nodeOrName)
    );

  const getCheckedNode = (nodeOrName) =>
    checkedNodes.filter(
      (singleNode) => singleNode.name === normalizeNode(nodeOrName)
    )[0];

  const addToClosedNodes = (node) => setClosedNodes([...closedNodes, node]);

  const foundTarget = (node) => {
    setTargetFound(true);
    setNextNode(null);
    setMessage(`Target found at ${node.name}`);
    getParentNode(node.parent);
    setRoad([node.parent]);
  };

  const getParentNode = (startNode) => {
    if (isOrigin(startNode)) return setTargetFound(true);

    let parentNodes = checkedNodes
      .filter((node) => node?.name === startNode?.name)
      .sort((a, b) => a.parent.gCost - b.parent.gCost);

    return parentNodes[0]?.parent;
  };

  const [testCount, setTestCount] = useState(0);

  useEffect(() => {
    if (!targetFound || road.length === 0) return;
    const roadInterval = setInterval(() => {
      targetFound && clearInterval(roadInterval);

      let parentNode = getParentNode(road[0]);

      if (isOrigin(parentNode)) {
        setTargetFound(true);
        setIsRunningAlgo(false);
      }
      !isOrigin(parentNode) && setRoad((prev) => [parentNode, ...prev]);
    }, 0);
    return () => clearInterval(roadInterval);
  }, [road, targetFound]);

  const noChildrenFound = () => {
    setNextNode(null);
    setMessage('no children found, target is unreachable');
  };

  const isReadyToRunAlgo = () => {
    if (origin.name === null) {
      setMessage('Origin required');
      return false;
    }
    if (target.name === null) {
      setMessage('Target required');
      return false;
    }
    setShowMenu(false);
    return true;
  };

  return (
    <DataContext.Provider
      value={{
        gridSize,
        setGridSize,
        grid,
        setGrid,
        windowSize,
        setWindowSize,
        objSelector,
        setObjSelector,
        origin,
        setOrigin,
        target,
        setTarget,
        walls,
        setWalls,
        isMouseDown,
        setIsMouseDown,

        settingSliders,
        objectSelectorButtons,
        message,
        setMessage,
        showNodeName,
        setShowNodeName,

        showFCost,
        setShowFCost,
        showGCost,
        setShowGCost,
        showHCost,
        setShowHCost,
        node,
        setNode,

        checkedNodes,
        setCheckedNodes,
        childMap,
        openNodes,
        setOpenNodes,
        closedNodes,
        setClosedNodes,
        currentNode,
        setCurrentNode,
        count,
        setCount,
        isOrigin,
        isTarget,
        isWall,
        isChecked,

        getCheckedNode,
        isClosed,
        addToClosedNodes,
        foundTarget,
        noChildrenFound,
        nextNode,
        setNextNode,
        isNextNode,
        targetFound,
        setTargetFound,
        road,
        setRoad,
        isRoad,
        testCount,
        isRunningAlgo,
        setIsRunningAlgo,
        nodeFromCoord,
        isReadyToRunAlgo,
        searchMode,
        setSearchMode,
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
