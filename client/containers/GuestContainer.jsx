import React from 'react';
import GuestPage from '../components/GuestPage.jsx'
import GuestList from '../components/GuestList.jsx'
import LogoutButton from '../components/LogoutButton.jsx';

const GuestContainer = (props) => {
  return (
    <div className="mainContainer">
      <h1 id="guestContainerHeader">MY GATEPASS</h1>
      <LogoutButton/>
      <div className="guestContainer">
        <GuestPage userId={props.userId}/>
        <GuestList userId={props.userId}/>
      </div>
    </div>
  )
}

export default GuestContainer;