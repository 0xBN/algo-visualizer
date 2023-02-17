import { useDataContext } from '../../contexts/DataContext';

function SelectedObjects() {
  const { origin, target, walls, nextNode, road, testCount } = useDataContext();

  const wallsList = walls.map((wall) => wall.name).join(', ');

  const roadList = road?.map((node) => node?.name).join(', ');

  return (
    <div>
      <p>
        <span className="font-bold">Origin</span>: {origin?.name ?? 'none'}
      </p>
      <p>
        <span className="font-bold">Target</span>: {target?.name ?? 'none'}
      </p>
      <p>
        <span className="font-bold">Next: </span>
        {nextNode?.name ?? 'none'}
      </p>
      {/* <p className={`border bg-red-500 z-50`}>
        <span className={`font-bold`}>Road</span>: {roadList ?? 'none'}
      </p> */}
      {/* <p className={`border bg-red-500 z-50`}>
        <span className={`font-bold`}>testCount</span>: {testCount ?? 'none'}
      </p> */}
      {/* <p className={`border bg-red-500 z-50`}>
        <span className={`font-bold`}>Walls</span>: {wallsList ?? 'none'}
      </p> */}
    </div>
  );
}
export default SelectedObjects;
