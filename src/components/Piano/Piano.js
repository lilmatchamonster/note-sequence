import { notes } from '../../notes';
import './Piano.css';

export const Piano = ({ addNoteToSequence }) => {
  const PianoKeys = () => {
    return notes.map((note, i) => (
      <div
        className="w-keys"
        role="button"
        key={i}
        tabIndex={i}
        onKeyDown={() => addNoteToSequence(note)}
        onClick={() => addNoteToSequence(note)}
      >
        <span>{note.label}</span>
      </div>
    ));
  };

  return (
    <div className="Piano">
      <div className="minors first">
        <div className="b-keys"></div>
        <div className="b-keys"></div>
      </div>
      <div className="minors second">
        <div className="b-keys"></div>
        <div className="b-keys"></div>
        <div className="b-keys"></div>
      </div>
      <div className="minors third">
        <div className="b-keys"></div>
      </div>
      <div className="majors">
        <PianoKeys />
      </div>
    </div>
  );
};