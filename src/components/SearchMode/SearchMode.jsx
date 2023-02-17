import { useDataContext } from '../../contexts/DataContext';

function SearchMode() {
  const { searchMode, setSearchMode } = useDataContext();
  return (
    <div>
      <h2>SearchMode</h2>
      <select
        name="searchType"
        id="searchType"
        className="text-black"
        onChange={(e) => setSearchMode(e.target.value)}
      >
        <option value="Dijkstra">Dijkstra</option>
        <option value="A*">A*</option>
        <option value="BFS">BFS</option>
        <option value="DFS">DFS</option>
      </select>
    </div>
  );
}
export default SearchMode;
