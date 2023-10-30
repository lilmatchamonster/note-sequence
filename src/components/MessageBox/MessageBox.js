import { BsInfoCircle } from 'react-icons/bs';
import './MessageBox.css';

export const MessageBox = () => {
  return (
    <div className="msg-container">
      <BsInfoCircle />
      <p>
        Sequence must have at least 3 notes and a maximum of 20 notes to save.
      </p>
    </div>
  );
};