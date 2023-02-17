import { useEffect } from 'react';
import { useDataContext } from '../../contexts/DataContext';
import { useAStar, useNode } from '../../hooks';
import { ResetButton } from '..';

const RunAlgoButton = () => {
  const {
    setObjSelector,
    checkedNodes,
    nextNode,
    isRunningAlgo,
    setIsRunningAlgo,

    isReadyToRunAlgo,
  } = useDataContext();
  const { stepThroughNode } = useNode();

  const { runCheckNodes } = useAStar();

  const runStepAlgo = () => {
    if (!isReadyToRunAlgo()) return;
    setObjSelector('stepThrough');
    runCheckNodes();
  };
  const runAutoAlgo = () => {
    if (!isReadyToRunAlgo()) return;
    setIsRunningAlgo(true);
    runCheckNodes();
  };

  useEffect(() => {
    if (!isRunningAlgo) return;
    stepThroughNode(nextNode);
  }, [checkedNodes, nextNode]);

  return (
    <div>
      <h2>Run</h2>
      <div className={`flex flex-row gap-1`}>
        <button
          onClick={runStepAlgo}
          className={`border p-1 font-bold bg-orange-400 text-black transition-all duration-200 hover:bg-orange-600 hover:text-white`}
        >
          Step
        </button>
        <button
          onClick={runAutoAlgo}
          className={`border p-1 font-bold bg-orange-400 text-black transition-all duration-200 hover:bg-orange-600 hover:text-white`}
        >
          Auto
        </button>
        <ResetButton />
      </div>
    </div>
  );
};
export default RunAlgoButton;
