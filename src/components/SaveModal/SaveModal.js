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
    getCache,
    setCache,
    getAllSaved,
  },
  noteSequence,
  name,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [showNameCheck, setShowNameCheck] = useState({ show: false, id: null });
  const [enableSave, setEnableSave] = useState(false);

  const save = async (id) => {
    const notes = noteSequence.map((item) => item.note);
    if (id) {
      putSequence(
        {
          Id: id,
          sequenceName: inputValue,
          noteSequence: notes.join(''),
        },
        setSavedItems,
        setCache
      );
    } else {
      try {
        const newSave = await postSequence(
          {
            sequenceName: inputValue,
            noteSequence: notes.join(''),
          },
          setSavedItems,
          setCache
        );
        setSelectedSave(newSave);
      } catch (e) {
        console.error(e);
      }
    }
    setShowNameCheck({ show: false, id: null });
  };

  const saveTitle = async () => {
    try {
      const nameExists = await checkSavedItems(inputValue, setSavedItems);
      if (nameExists)
        return setShowNameCheck({ show: true, id: nameExists.Id });

      save();
      setAnimate(true);
      setTimeout(() => {
        setShowSaveModal(false);
      }, 1000);
    } catch (e) {
      console.error(e);
    }
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