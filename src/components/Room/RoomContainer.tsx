import React, { useEffect, useState } from 'react';
// Component Imports:
import Popup from './Popup';
import UsernameForm from './UsernameForm';
import RoomView from '../RoomView/RoomView';
import FetchRoom from './FetchRoom';
import SignInAnonymously from '../FirebaseAuth/SignInAnonymously';
import OnAuthStateChanged from '../FirebaseAuth/OnAuthStateChanged';
import Navbar from '../Navbar/Navbar';
import DocumentTitleChange from './DocumentTitleChange';
import './userForm.css';

function RoomContainer() {
  const [timedPopup, setTimedPopup] = useState<boolean>(false);
  const [canBeClosed, setCanBeClosed] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);

  // Run custom hooks
  const isSignedIn = SignInAnonymously();
  DocumentTitleChange();
  OnAuthStateChanged();

  return (
    <div>
      <Navbar />
      <FetchRoom />
      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <UsernameForm canBeClosed={canBeClosed} setCanBeClosed={setCanBeClosed} />
      </Popup>
      {isSignedIn && <RoomView className={timedPopup ? 'disabled' : ''} />}
    </div>
  );
}

export default RoomContainer;
