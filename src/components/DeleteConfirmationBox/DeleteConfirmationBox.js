import React, { useContext } from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { CloseContext, deleteSequence } from '../../utils';
import './DeleteConfirmationBox.css';

export const DeleteConfirmationBox = ({
  handlers: { setSavedItems, setSelectedSave, setShowDeleteConfirmation },
  selectedSave,
}) => {

  const closeModal = useContext(CloseContext);

  const deleteItem = () => {
    deleteSequence(selectedSave.id, setSavedItems);
    setSelectedSave({});
    closeModal();
    setTimeout(() => {
      setShowDeleteConfirmation(false)
    }, 1000);
  };

  const cancelHandler = () => {
    closeModal();
    setTimeout(() => {
      setShowDeleteConfirmation(false)
    }, 1000);
  }

  const deleteItemCopy = {
    header: 'Delete Sequence',
    copy: 'Are you sure you want to PERMANENTLY DELETE this saved song?',
  };

  return (
    <div id="deletion-box">
      <header>
        <BsExclamationTriangle />
        {deleteItemCopy.header}
      </header>
      <p>{deleteItemCopy.copy}</p>
      <div className='action-btns'>
        <button className="cancel" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
};