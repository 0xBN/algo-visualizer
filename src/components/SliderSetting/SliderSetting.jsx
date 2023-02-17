import { useDataContext } from '../../contexts/DataContext';

function SliderSetting({ label, min, max, value }) {
  const {
    gridSize,
    setGridSize,
    isRunningAlgo,
    setOrigin,
    setTarget,
    setWalls,
    setCheckedNodes,
    setClosedNodes,
    setMessage,
    setRoad,
    setTargetFound,
    setIsRunningAlgo,
    node,
  } = useDataContext();

  const handleGridChange = (e) => {
    if (isRunningAlgo) return;
    softReset();

    setGridSize({
      ...gridSize,
      row: Number(e.target.value),
      col: Number(e.target.value),
    });
  };

  const softReset = () => {
    setOrigin(node);
    setTarget(node);
    setWalls([]);
    setCheckedNodes([]);
    setClosedNodes([]);
    setMessage('');
    setRoad([]);
    setTargetFound(false);
    setIsRunningAlgo(false);
  };

  const name = {
    Rows: 'row',
    Cols: 'col',
    'Square Size': 'square',
    Dimension: 'dimension',
  };

  return (
    <div className="flex flex-col">
      <p className="font-bold">{label}:</p>
      <input
        className="text-white font-bold bg-slate-700 w-32 cursor-pointer"
        min={min}
        max={max}
        type="number"
        name={name[label]}
        value={value}
        onChange={handleGridChange}
      />
      <input
        className="text-white font-bold bg-slate-700 w-32 cursor-pointer"
        min={min}
        max={max}
        type="range"
        name={name[label]}
        value={value}
        onChange={handleGridChange}
      />
    </div>
  );
}
export default SliderSetting;
