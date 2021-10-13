import React, { useEffect, useState } from 'react';
import GuestPage from '../components/GuestPage.jsx'
import GuestList from '../components/GuestList.jsx'
import LogoutButton from '../components/LogoutButton.jsx';

const GuestContainer = (props) => {
  const [guestArray, setGuestArray] = useState([]);

  const getGuests = () => {
    fetch('/portal/getGuests')
      .then(res => res.json())
      .then(data => {
        setGuestArray(data);
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getGuests();
  }, [])
  return (
    <div className="mainContainer">
      <h1 id="guestContainerHeader">MY GATEPASS</h1>
      <LogoutButton/>
      <div className="guestContainer">
        <GuestPage userId={props.userId}/>
        <GuestList guestArray={guestArray} getGuests={getGuests} userId={props.userId}/>
      </div>
    </div>
  )
}

export default GuestContainer;