import * as Constants from '../../constants';
import { useDataContext } from '../../contexts/DataContext';
import {
  GridSettings,
  RunAlgoButton,
  SelectedObjects,
  SearchMode,
  HeaderSection,
} from '..';

const Header = () => {
  const { gridSize, showMenu, setShowMenu } = useDataContext();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header
      className={`bg-gray-800 flex justify-evenly w-full p-4 fixed md:relative  items-center flex-col md:h-full md:w-full md:left-0 z-10 gap-4 `}
    >
      <h1 className={`font-bold font-sans sm:text-3xl text-sm text-center`}>
        Algorithm Visualizer
      </h1>
      <button onClick={handleMenu} className={`md:hidden`}>
        {showMenu ? 'hide menu' : 'show menu'}
      </button>

      <HeaderSection element={<SearchMode />} />
      <HeaderSection element={<SelectedObjects />} />
      <HeaderSection element={<GridSettings />} />
      <HeaderSection element={<RunAlgoButton />} />
    </header>
  );
};
export default Header;
