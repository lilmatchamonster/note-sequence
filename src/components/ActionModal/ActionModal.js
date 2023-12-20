import React, { useState, useEffect } from 'react';
import { CloseContext } from '../../utils';
import './ActionModal.css';

export const ActionModal = ({ setShowSaveModal, children }) => {
  const [animate, setAnimate] = useState(false);

  const closeModal = () => {
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


  return (
    <div className={`bg-overlay ${animate ? 'fade-out close-animation' : ''}`}>
      <div id="save-modal">
        <CloseContext.Provider value={closeModal}>
          {children}
        </CloseContext.Provider>
      </div>
    </div>
  );
}