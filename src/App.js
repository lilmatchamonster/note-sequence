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
  getCache,
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
  const [cache, setCache] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const items = [
    { Id: 1, noteSequence: 'c4', sequenceName: 'Song' },
    { Id: 2, noteSequence: 'c5b4g4a4', sequenceName: 'Electric Avenue' },
    { Id: 3, noteSequence: 'a4f4g4c5', sequenceName: 'Snap Dragon Pop' },
    { Id: 4, noteSequence: 'g4b4c5c4a4', sequenceName: 'Autumn Voyage' },
    { Id: 5, noteSequence: 'd4f4a4g4', sequenceName: 'Sea Shanty 2' },
    { Id: 6, noteSequence: 'f4e4f4g4c5', sequenceName: 'Cabbage Patch' },
    { Id: 7, noteSequence: 'b4a4g4e4', sequenceName: 'Harmony' },
    {
      Id: 8,
      noteSequence: 'a4d4g4e4',
      sequenceName: 'Orange, I Did Not Say Banana',
    },
    { Id: 9, noteSequence: 'c4c5a4f4', sequenceName: 'Home Sweet Home' },
    { Id: 10, noteSequence: 'e4b4g4a4', sequenceName: 'Camelot' },
  ];

  useEffect(() => {
    showSaveModal || showDeleteConfirmation
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [showSaveModal, showDeleteConfirmation]);

  useEffect(() => {
    // **WARNING - uncomment the 2 lines below when backend is running
    // getAllSaved().then(setSavedItems);
    // getCache().then(setCache);
    // **WARNING - comment out the line below when backend is running
    setSavedItems(items);
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
            setCache,
            getAllSaved,
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
          cache={cache}
          setCache={setCache}
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