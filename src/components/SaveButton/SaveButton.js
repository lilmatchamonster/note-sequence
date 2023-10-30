import { BsSave2 } from 'react-icons/bs';
import './SaveButton.css';

export const SaveButton = ({ setShowSaveModal, noteSequence }) => {
  const openSaveScreen = () => {
    if (noteSequence.length > 2) {
      setShowSaveModal(true);
    }
  };

  return (
    <button
      className="save-button"
      title="Save"
      disabled={noteSequence.length < 3}
      onClick={openSaveScreen}
    >
      <BsSave2 />
    </button>
  );
};