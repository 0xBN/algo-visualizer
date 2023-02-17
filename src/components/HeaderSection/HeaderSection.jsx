import { useDataContext } from '../../contexts/DataContext';

function HeaderSection({ element }) {
  const { showMenu } = useDataContext();
  return (
    <div className={`${!showMenu && 'hidden'} md:block border p-1`}>
      {element}
    </div>
  );
}
export default HeaderSection;
