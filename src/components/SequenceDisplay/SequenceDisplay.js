import './SequenceDisplay.css';

export const SequenceDisplay = ({ selectedNote }) => {
  return <input className="sequence-display" value={selectedNote} readOnly />;
};