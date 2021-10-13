import React, { useState, useEffect } from 'react';
// import {createGlobalState} from 'react-hooks-global-state';
import Guest from './Guest';

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([]);

  // fetches guest list upon component mount
  useEffect(() => {
    refreshGuestList();
  }, [])

  const refreshGuestList = () => {
    fetch('/portal/getGuests')
      .then(res => res.json())
      .then(data => {
        const guestArray = [];
        // console.log(data);
        data.map((guest) => {
          guestArray.push(<Guest guestList={guestList} setGuestList={setGuestList} key={guest._id} guestId={guest._id} firstName={guest.first_name} lastName={guest.last_name} email={guest.email} />)
        })
        setGuestList(guestArray);
      })
    // populate array with guest list
  }

  return (
    <div className="guestList">
      <h1 className="guestHeader">MY GUESTS</h1>
      <div>
        {guestList}
      </div>
      {/* <button onClick={refreshGuestList}>Refresh Guest List</button> */}
    </div>
  )
};

export default GuestList;