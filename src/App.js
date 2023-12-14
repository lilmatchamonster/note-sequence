import { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { ClearButton } from './components/ClearButton/ClearButton';
import { DeleteButton } from './components/DeleteButton/DeleteButton';
import { DeleteConfirmationBox } from './components/DeleteConfirmationBox/DeleteConfirmationBox';
import { Dropdown } from './components/Dropdown/Dropdown';
import { MessageBox } from './components/MessageBox/MessageBox';
import { Piano } from './components/Piano/Piano';
import { PlayButton } from './components/PlayButton/PlayButton';
import { SaveButton } from './components/SaveButton/SaveButton';
import { SaveModal } from './components/SaveModal/SaveModal';
import { SequenceDisplay } from './components/SequenceDisplay/SequenceDisplay';
import { UndoLastButton } from './components/UndoLastButton/UndoLastButton';
import {
  getAllSaved,
  convertToString,
  convertToUsablePair,
} from './utils';
import './App.css';

const App = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [noteSequence, setNoteSequence] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');

  const [selectedSave, setSelectedSave] = useState({});
  const [savedItems, setSavedItems] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    showSaveModal || showDeleteConfirmation
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [showSaveModal, showDeleteConfirmation]);

  useEffect(() => {
    setSavedItems(getAllSaved);
  }, []);

  useEffect(() => {
    const labels = convertToString(noteSequence);
    setSelectedNote(labels);
  }, [noteSequence]);

  useEffect(() => {
    if (Object.keys(selectedSave).length !== 0) {
      const format = convertToUsablePair(selectedSave.noteSequence);
      setNoteSequence(format);
      return;
    }
    return setNoteSequence([]);
  }, [selectedSave]);

  Howler.volume(0.8);

  const playNote = (src) => {
    const sound = new Howl({
      src: [src],
    });
    sound.play();
  };

  const addNoteToSequence = (note) => {
    playNote(note.sound);

    if (noteSequence.length < 20) {
      return setNoteSequence((prevSequence) => [
        ...prevSequence,
        { label: note.label, note: note.note },
      ]);
    }
  };

  return (
    <div className="App">
      {showSaveModal && (
        <SaveModal
          title={'Save Sequence'}
          handlers={{
            setShowSaveModal,
            setSavedItems,
            setSelectedSave,
          }}
          noteSequence={noteSequence}
          name={selectedSave.sequenceName}
        />
      )}
      <div className="App-wrapper">
        <header className="App-header">Note Sequencer App</header>
        <div className="subheader">Imagine. Create.</div>
        <Dropdown
          items={savedItems}
          setSelectedSave={setSelectedSave}
        />
        <main>
          <Piano addNoteToSequence={addNoteToSequence} />
          {Object.keys(selectedSave).length !== 0 && (
            <div className="selected-title">
              <ClearButton setSelectedSave={setSelectedSave} />
              <h4>Selected Title: {selectedSave.sequenceName}</h4>
            </div>
          )}
          <div className="display-wrapper">
            <SequenceDisplay selectedNote={selectedNote} />
            <UndoLastButton
              setSelectedNote={setSelectedNote}
              setNoteSequence={setNoteSequence}
            />
          </div>
          <div className="control-wrapper">
            <PlayButton noteSequence={noteSequence} playNote={playNote} />
            <SaveButton
              setShowSaveModal={setShowSaveModal}
              noteSequence={noteSequence}
            />
            {Object.keys(selectedSave).length !== 0 && (
              <DeleteButton
                setShowDeleteConfirmation={setShowDeleteConfirmation}
              />
            )}
            {showDeleteConfirmation && (
              <DeleteConfirmationBox
                selectedSave={selectedSave}
                handlers={{ setSavedItems, setSelectedSave }}
                showDeleteConfirmation={showDeleteConfirmation}
                setShowDeleteConfirmation={setShowDeleteConfirmation}
              />
            )}
          </div>
          <MessageBox />
        </main>
      </div>
    </div>
  );
};

export default App;