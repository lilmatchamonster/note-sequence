import { BsPlayCircle } from 'react-icons/bs';
import { notes } from '../../notes';
import './PlayButton.css';

export const PlayButton = ({ noteSequence, playNote }) => {
  const playSequence = () => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= noteSequence.length) {
        clearInterval(interval);
        return;
      }
      const note = noteSequence[index];

      playNote(notes.find((n) => n.note === note.note)?.sound);
      index++;
    }, 500); // Adjust the delay between each note playback if desired
  };

  return (
    <button className="play-button" title="Play" onClick={playSequence}>
      <BsPlayCircle />
    </button>
  );
};