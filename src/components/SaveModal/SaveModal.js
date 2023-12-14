import React, { useState, useEffect } from 'react';
import { ConfirmationBox } from '../ConfirmationBox/ConfirmationBox';
import { postSequence, putSequence, checkSavedItems } from '../../utils';
import './SaveModal.css';

export const SaveModal = ({
  title,
  handlers: {
    setShowSaveModal,
    setSavedItems,
    setSelectedSave,
  },
  noteSequence,
  name,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [showNameCheck, setShowNameCheck] = useState({ show: false, id: null });
  const [enableSave, setEnableSave] = useState(false);

  const save = (id) => {
    const notes = noteSequence.map((item) => item.note);
    const obj = {
      sequenceName: inputValue,
      noteSequence: notes.join(''),
    }
    if (id) {
      putSequence(
        {
          ...obj,
         id: id,
        },
        setSavedItems
      );
      setSelectedSave(obj);
    } else {
      const newSave = postSequence(
        obj,
        setSavedItems
      );
      setSelectedSave(newSave);
    }
    setShowNameCheck({ show: false, id: null });
  };

  const saveTitle = () => {
    const nameExists = checkSavedItems(inputValue, setSavedItems);

    if (nameExists)
      return setShowNameCheck({ show: true, id: nameExists.id });

    save();
    setAnimate(true);
    setTimeout(() => {
      setShowSaveModal(false);
    }, 1000);
  };

  const cancelTitle = () => {
    setAnimate(true);
    setTimeout(() => {
      setShowSaveModal(false);
    }, 1000);
  };

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
  }, [animate]);

  useEffect(() => {
    name && setInputValue(name);
  }, [name]);

  useEffect(() => {
    if (inputValue.length > 2) {
      setEnableSave(true);
    } else {
      setEnableSave(false);
    }
  }, [inputValue]);

  return (
    <div className={`bg-overlay ${animate ? 'fade-out close-animation' : ''}`}>
      <div id="save-modal">
        {showNameCheck.show ? (
          <ConfirmationBox
            saveHandler={save}
            cancelHandler={setShowNameCheck}
            putId={showNameCheck.id}
            closeMain={cancelTitle}
            name={name}
          />
        ) : (
          <>
            <h3 className="save-title">{title}</h3>
            <input
              id="input-box"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength="25"
            ></input>
            <div>
              <button className="cancel-btn" onClick={cancelTitle}>
                Cancel
              </button>
              <button
                className={`save-btn ${enableSave ? '' : 'faded-button'}`}
                onClick={saveTitle}
                disabled={!enableSave}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};