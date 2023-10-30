import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import './ConfirmationBox.css';

export const ConfirmationBox = ({
  cancelHandler,
  saveHandler,
  closeMain,
  putId,
  name,
}) => {
  const handleSave = () => {
    saveHandler(putId);
    closeMain();
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
      <>
        <button className="cancel" onClick={() => cancelHandler(false)}>
          Cancel
        </button>
        <button className="save" onClick={handleSave}>
          Save
        </button>
      </>
    </div>
  );
};