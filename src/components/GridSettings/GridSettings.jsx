import { useDataContext } from '../../contexts/DataContext';

import {
  SliderSetting,
  ObjectButton,
  ResetButton,
  SelectedObjects,
  RunAlgoButton,
  NodeLabelButton,
} from '..';

function GridSettings() {
  const {
    objSelector,

    settingSliders,
    objectSelectorButtons,
    gridSize,
    isRunningAlgo,
  } = useDataContext();

  const generateObjectSelectorButtons = objectSelectorButtons.map((label) => (
    <ObjectButton label={label} key={label} />
  ));

  const generateSettingSliders = settingSliders.map((slider) => (
    <SliderSetting
      key={slider.label}
      label={slider.label}
      min={slider.min}
      max={slider.max}
      value={slider.value}
    />
  ));

  return (
    <div className="sm:flex gap-4 items-center sm:flex-col">
      <div className="flex flex-col items-center">
        <p className="font-bold">
          {objSelector === 'stepThrough' && 'SteppingThrough'}
          {objSelector !== 'stepThrough' && 'SelectMode'}
        </p>
        <div className="flex md:flex-row flex-col">
          {generateObjectSelectorButtons}
        </div>
      </div>

      <div className="grid place-content-center">{generateSettingSliders}</div>

      <div className="grid grid-cols-2">
        <NodeLabelButton type="node" css />
        <NodeLabelButton type="f" />
        <NodeLabelButton type="g" />
        <NodeLabelButton type="h" />
      </div>
    </div>
  );
}
export default GridSettings;
