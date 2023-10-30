import { BsBackspace } from 'react-icons/bs';
import './UndoLastButton.css';

export const UndoLastButton = ({ setNoteSequence, setSelectedNote }) => {
  const undoLastNote = () => {
    setNoteSequence((prevSequence) => {
      const newSequence = [...prevSequence];
      newSequence.pop();
      return newSequence;
    });

    setSelectedNote((prevNote) => prevNote.slice(0, -1));
  };

  return (
    <button className="undo-button" title="Undo" onClick={undoLastNote}>
      <BsBackspace />
    </button>
  );
};