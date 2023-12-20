import React, { useContext } from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { CloseContext } from '../../utils';
import './ConfirmationBox.css';

export const ConfirmationBox = ({
  cancelHandler,
  saveHandler,
  putId,
  name,
}) => {
  const closeModal = useContext(CloseContext);

  const handleSave = () => {
    saveHandler(putId);
    closeModal();
  };

  const isNewItem = name
    ? {
        header: `Update Sequence`,
        copy: 'Are you sure you want to update saved sequence?',
      }
    : {
        header: 'Title Already Exists',
        copy: 'Are you sure you want to override existing saved sequence with same name?',
      };

  return (
    <div id="confirmation-box">
      <header>
        <BsExclamationTriangle />
        {isNewItem.header}
      </header>
      <p>{isNewItem.copy}</p>
      <div className='action-btns'>
        <button className="cancel" onClick={() => cancelHandler(false)}>
          Cancel
        </button>
        <button className="save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};