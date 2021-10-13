import React, { useState } from 'react';


const Guest = (props) => {
  const [showInfo, setShowInfo] = useState(false);

  const deleteGuest = (e) => {
    console.log('target: ', e.target.id)
    fetch('/portal/deleteGuest', {
      method: 'delete',
      body: JSON.stringify({ guestId: e.target.id }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      props.refreshGuestList();
    })
      .catch(err => console.log('Error: ', err))
  }

  return (
    <span>
      <div onClick={() => setShowInfo(!showInfo)}>{props.firstName} {props.lastName}</div>
      {showInfo &&
        <div>{props.email}
          <button id={props.guestId} onClick={deleteGuest}>delete user</button>
        </div>
      }

    </span>
  )
};

export default Guest;