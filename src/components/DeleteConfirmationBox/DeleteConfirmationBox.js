import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import './DeleteConfirmationBox.css';
import { deleteSequence } from '../../utils';

export const DeleteConfirmationBox = ({
  handlers: { setSavedItems, setSelectedSave },
  selectedSave,
  showDeleteConfirmation,
  setShowDeleteConfirmation,
}) => {
  const deleteItemCopy = {
    header: 'Delete Sequence',
    copy: 'Are you sure you want to PERMENENTLY DELETE this saved song?',
  };

  const cancelHandler = () => {
    setShowDeleteConfirmation(false);
  };

  const deleteItem = () => {
    deleteSequence(selectedSave.Id, setSavedItems);
    setSelectedSave({});
    setShowDeleteConfirmation(false);
  };

  return (
    showDeleteConfirmation && (
      <div id="delete-wrapper">
        <div id="delete-confirmation-box">
          <header>
            <BsExclamationTriangle />
            {deleteItemCopy.header}
          </header>
          <p>{deleteItemCopy.copy}</p>
          <div>
            <button className="cancel" onClick={() => cancelHandler(false)}>
              Cancel
            </button>
            <button className="delete" onClick={deleteItem}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};