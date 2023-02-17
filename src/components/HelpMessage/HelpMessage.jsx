import { useDataContext } from '../../contexts/DataContext';

function HelpMessage() {
  const { message, setMessage } = useDataContext();
  const closeMessage = () => {
    setMessage('');
  };

  const isEmpty =
    message.length === 0
      ? null
      : 'top-32 text-3xl cursor-pointer bg-red-500 rounded-md p-2';
  return (
    <div onClick={closeMessage} className={`absolute ${isEmpty} z-10`}>
      {message} {message ? '(click to close)' : null}
    </div>
  );
}
export default HelpMessage;
