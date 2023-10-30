import { BsXCircleFill } from 'react-icons/bs';
import './ClearButton.css';

export const ClearButton = ({ setSelectedSave }) => {
  return (
    <button
      className="clear-button"
      title="Clear Selected"
      onClick={() => setSelectedSave({})}
    >
      <BsXCircleFill />
    </button>
  );
};