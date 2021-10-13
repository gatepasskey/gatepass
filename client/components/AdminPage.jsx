import React, { useState } from 'react';

const AdminPage = (props) => {

  const deleteGuest = (e) => {
    console.log('target: ',e.target.id)
    fetch('/portal/deleteGuest', {
      method:'delete',
      body: JSON.stringify({guestId: e.target.id}),
      headers: {'Content-Type': 'application/json'}
    }).then((res) => {
      const button = document.getElementById(e.target.id);
      const parentTable = button.parentNode.parentNode;
      console.log(parentTable);
      parentTable.remove();
    })
    .catch(err => console.log('Error: ', err))
  }

  const guests = props.guestList.map(guest => {
    // console.log(guest);
    return (
      <tr key={guest._id}>
        <td>{guest.first_name}{guest.last_name}</td>
        <td>{guest.email}</td>
        <td>{guest.phone_number}</td>
        <td>{guest.license_number}</td>
        <td>{guest.address}</td>
        <td><button id={guest._id} onClick={deleteGuest}>delete user</button></td>
      </tr>
    )
  })
  console.log('guests: ', guests)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>GUEST</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>LICENSE</th>
            <th>ADDRESS</th>
          </tr>
        </thead>
        <tbody>
          {guests}
        </tbody>
      </table>
    </>
  )
};

export default AdminPage;