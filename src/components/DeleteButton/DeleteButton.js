import { BsTrash3Fill } from 'react-icons/bs';

import './DeleteButton.css';

export const DeleteButton = ({ setShowSaveModal, setShowDeleteConfirmation }) => {
  const deleteConfirmation = () => {
    setShowDeleteConfirmation(true);
    setShowSaveModal(true);
  };

  return (
    <button
      title="Delete"
      className="delete-button"
      onClick={deleteConfirmation}
    >
      <BsTrash3Fill />
    </button>
  );
};