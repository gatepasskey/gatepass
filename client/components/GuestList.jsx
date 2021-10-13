import React, { useState, useEffect } from 'react';
// import {createGlobalState} from 'react-hooks-global-state';
import Guest from './Guest';

const GuestList = (props) => {
  // const [guestList, setGuestList] = useState([]);

  // // fetches guest list upon component mount
  // useEffect(() => {
  //   refreshGuestList();
  // }, [])

  // Method to refresh guest List
  // const refreshGuestList = () => {
  //   const tempArray = [];
  //   fetch('/portal/getGuests')
  //     .then(res => res.json())
  //     .then(data => {
  //       data.map((guest) => {
  //         tempArray.push(<Guest
  //           refreshGuestList={refreshGuestList}
  //           guestList={guestList}
  //           setGuestList={setGuestList}
  //           key={guest._id}
  //           guestId={guest._id}
  //           firstName={guest.first_name}
  //           lastName={guest.last_name}
  //           email={guest.email}
  //         />)
  //       })
  //       setGuestList(tempArray);
  //     })
  // }

<<<<<<< HEAD

  return (
    <div>
      <h1>Guest List</h1>
      <div>
        {props.guestList}
      </div>
      <button onClick={props.refreshGuestList}>Refresh Guest List</button>
    </div>
  )
=======
  return (
    <div className="guestList">
      <h1 className="guestHeader">MY GUESTS</h1>
      <div>
        {guestList}
      </div>
      <button onClick={refreshGuestList}>Refresh Guest List</button>
  </div>
)
>>>>>>> dev
};

export default GuestList;