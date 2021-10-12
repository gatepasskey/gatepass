import React, { useState } from 'react';
// import {createGlobalState} from 'react-hooks-global-state';
import Guest from './Guest';

const GuestList = (props) => {
  // const { useGlobalState } = createGlobalState({userId: ''});
  // const [userId, setUserId] = useGlobalState('userId');  
  // console.log('user id: ', props.userId)
  // const [guestList, setGuestList] = useState([]);
  const guestArray = [];
  const refreshGuestList = () => {
    fetch('/guestList', {
      method: 'post',
      body: JSON.stringify(props.userId),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        data.map((guest) => {
          guestArray.push(<Guest name={guest.name} lastname={guest.lastname} phone address car />)
        })
        // setGuestList(guestArray);
      })
    // populate array with guest list
  }

  return (
    <div>
      <h1>Guest List</h1>
      {guestArray}
      <button onClick={refreshGuestList}>Refresh Guest List</button>
    </div>
  )
};

export default GuestList;