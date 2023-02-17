import { useDataContext } from '../../contexts/DataContext';

function NodeLabelButton({ type }) {
  const {
    setShowHCost,
    setShowGCost,
    setShowFCost,
    setShowNodeName,

    showHCost,
    showGCost,
    showFCost,
    showNodeName,
  } = useDataContext();

  const map = {
    h: showHCost,
    g: showGCost,
    f: showFCost,
    node: showNodeName,
  };

  const handleClick = () => {
    type === 'h' && setShowHCost(!showHCost);
    type === 'g' && setShowGCost(!showGCost);
    type === 'f' && setShowFCost(!showFCost);
    type === 'node' && setShowNodeName(!showNodeName);
  };

  const isOn = map[type];
  return (
    <button
      className={`border p-1 hover:bg-white hover:text-black transition-all duration-200 rounded-sm ${
        !isOn && 'line-through'
      }`}
      onClick={handleClick}
    >
      {type}
      {type !== 'node' && 'Cost'}: {isOn ? 'On' : 'Off'}
    </button>
  );
}
export default NodeLabelButton;
