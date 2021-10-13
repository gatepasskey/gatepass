import React, { useEffect, useState } from 'react';
import GuestPage from '../components/GuestPage.jsx'
import GuestList from '../components/GuestList.jsx'
import LogoutButton from '../components/LogoutButton.jsx';
import Guest from '../components/Guest';

const GuestContainer = (props) => {
  const [guestList, setGuestList] = useState([]);

  // fetches guest list upon component mount
  useEffect(() => {
    refreshGuestList();
  }, [])

  const refreshGuestList = () => {
    const tempArray = [];
    fetch('/portal/getGuests')
      .then(res => res.json())
      .then(data => {
        data.map((guest) => {
          tempArray.push(<Guest
            refreshGuestList={refreshGuestList}
            guestList={guestList}
            setGuestList={setGuestList}
            key={guest._id}
            guestId={guest._id}
            firstName={guest.first_name}
            lastName={guest.last_name}
            email={guest.email}
          />)
        })
        setGuestList(tempArray);
      })
  }
  return (
    <div className="mainContainer">
      <h1 id="guestContainerHeader">MY GATEPASS</h1>
      <LogoutButton />
      <div className="guestContainer">
        <GuestPage
          guestList={guestList}
          refreshGuestList={refreshGuestList}
          userId={props.userId} />
        <GuestList
          guestList={guestList}
          refreshGuestList={refreshGuestList}
          userId={props.userId} />
      </div>
    </div>
      )
}

      export default GuestContainer;