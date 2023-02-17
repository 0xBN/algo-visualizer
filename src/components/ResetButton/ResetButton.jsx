import { useDataContext } from '../../contexts/DataContext';

function ResetButton() {
  const {
    setOrigin,
    setTarget,
    setWalls,
    node,
    setCheckedNodes,
    setClosedNodes,
    setMessage,
    setRoad,
    setTargetFound,

    setGridSize,
    setGrid,
    setWindowSize,
    setObjSelector,
    isMouseDown,
    setIsMouseDown,
    setShowNodeName,
    setShowFCost,
    setShowGCost,
    setShowHCost,
    setNode,
    setOpenNodes,
    setCurrentNode,
    setCount,
    setNextNode,
    setIsRunningAlgo,
  } = useDataContext();

  const handleReset = () => {
    setOrigin(node);
    setTarget(node);
    setWalls([]);
    setCheckedNodes([]);
    setClosedNodes([]);
    setMessage('');
    setRoad([]);
    setTargetFound(false);
    setIsRunningAlgo(false);
    setObjSelector('origin');
  };

  return (
    <button
      className={`border p-2 hover:bg-red-600 transition-all duration-200 `}
      onClick={handleReset}
    >
      Reset All
    </button>
  );
}
export default ResetButton;
