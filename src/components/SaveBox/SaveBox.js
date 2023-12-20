import React, { useState, useEffect, useContext } from 'react';
import { ConfirmationBox } from '../ConfirmationBox/ConfirmationBox';
import { CloseContext, postSequence, putSequence, checkSavedItems } from '../../utils';
import './SaveBox.css';

export const SaveBox = ({ 
  handlers: {
    setSavedItems,
    setSelectedSave,
  },
  noteSequence,
  name, 
}) => {
  const closeModal = useContext(CloseContext);
  const [inputValue, setInputValue] = useState('');
  const [showNameCheck, setShowNameCheck] = useState({ show: false, id: null });
  const [enableSave, setEnableSave] = useState(false);

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
    closeModal();
  };

  return (
    <div>
      {showNameCheck.show ? (
        <ConfirmationBox
          saveHandler={save}
          cancelHandler={setShowNameCheck}
          putId={showNameCheck.id}
          name={name}
        />
      ) : (
        <div id="save-box">
          <header className="save-title">Save Sequence</header>
            <label htmlFor='input-box'>Name:</label>
            <input
              id="input-box"
              type="text"
              title="Name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength="25"
            ></input>
            
          <div className='action-btns'>
            <button className="cancel-btn" onClick={closeModal}>
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
        </div>
      )}
    </div>
  )
}