import { useDataContext } from '../../contexts/DataContext';

function NodeLabel({ type, label, value }) {
  const { showFCost, showGCost, showHCost, showNodeName } = useDataContext();
  const leftSide = `translate-y-1 left-1`;
  const centerTop = `left-1/2 -translate-x-1/2 translate-y-1/4`;
  const rightSide = `right-1 translate-y-1`;
  const middleBottom = `bottom-0 left-1/2 -translate-x-1/2`;
  const largeCenter = `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold`;

  const labelMap = {
    g: { show: showGCost, location: leftSide, value: value ?? '' },
    f: { show: showFCost, location: centerTop, value: value ?? '' },
    h: { show: showHCost, location: rightSide, value: value ?? '' },
    nodeName: { show: showNodeName, location: middleBottom },
    origin: { show: true, location: largeCenter },
    target: { show: true, location: largeCenter },
  };

  const isShown = !labelMap[type].show ? 'hidden' : null;
  const { location } = labelMap[type];
  const content = ['g', 'h', 'f'].includes(type)
    ? `${labelMap[type].value}`
    : // ? `${type}:${labelMap[type].value}`
    label !== undefined
    ? label
    : null;

  const labelContent = (
    <p className={`absolute ${isShown} ${location} text-black`}>{content}</p>
  );

  return labelContent;
}
export default NodeLabel;
