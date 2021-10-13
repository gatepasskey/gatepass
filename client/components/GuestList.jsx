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
    props.getGuests();
    const tempArray = [];
    console.log(props.guestArray);
    props.guestArray.map((guest) => {
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
    // console.log(tempArray);
    setGuestList(tempArray);
  }
  // populate array with guest list


return (
  <div>
    <h1>Guest List</h1>
    <div>
      {guestList}
    </div>
    <button onClick={refreshGuestList}>Refresh Guest List</button>
  </div>
)
};

export default GuestList;