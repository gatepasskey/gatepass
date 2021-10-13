import React, { useState } from 'react';


const Guest = (props) => {

  const deleteGuest = (e) => {
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
      <div id="guest">{props.firstName} {props.lastName}
      <button className="deleteGuestFromList" id={props.guestId} onClick={deleteGuest}>X</button>
      </div>
    </span>
  )
};

export default Guest;