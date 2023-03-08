import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './ClipboardAlert.css';

export default function ClipboardAlert() {
  const clipText = useSelector((state) => state.clipboard);
  const isApple = useSelector((state) => state.isApple);

  const [dClass, setDClass] = useState('d-none');

  useEffect(() => {
    if (isApple || !clipText) return;
    setDClass('clipboard-container');
    setTimeout(() => {
      setDClass('d-none');
    }, 1500);
  }, [clipText]);

  return !isApple && clipText ? (
    <div className={dClass}>
      <div className="clipboard-alert">
        <p>
          Copied &ldquo;
          <b>{clipText}</b>
          &ldquo; to Clipboard
        </p>
      </div>
    </div>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  );
}
