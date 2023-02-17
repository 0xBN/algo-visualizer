import { useDataContext } from '../../contexts/DataContext';

function ObjectButton({ label }) {
  const { objSelector, setObjSelector, checkedNodes } = useDataContext();
  const handleObjectChange = (e) => setObjSelector(e.target.name);
  console.log();

  const isHighlighted =
    objSelector === label
      ? 'bg-green-700 font-bold underline cursor-default'
      : 'bg-red-900 opacity-60 hover:opacity-90 hover:bg-red-700';

  return (
    <button
      name={label}
      onClick={handleObjectChange}
      className={`border p-2 ${isHighlighted} `}
      disabled={!!checkedNodes.length}
    >
      {label}
    </button>
  );
}
export default ObjectButton;
