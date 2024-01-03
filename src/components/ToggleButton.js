import React, { useState } from 'react';
import AI from './AI';
import Dropbox from './Dropbox';
import './ToggleButton.css';

const ToggleButton = () => {
  const [showDropbox, setShowDropbox] = useState(true);
  const [buttonText, setButtonText] = useState('Dropbox');

  const handleToggle = () => {
    setButtonText((prevText) => (prevText === 'Dropbox' ? 'AI' : 'Dropbox'));
    setShowDropbox((prevShowDropbox) => !prevShowDropbox);
  };

  return (
    <div className="button-container">
      <button onClick={handleToggle} className={`toggle-button ${showDropbox ? 'active-component' : 'inactive-component'}`}>
        {buttonText}
      </button>

      {showDropbox ? <AI /> : <Dropbox />}
    </div>
  );
};

export default ToggleButton;