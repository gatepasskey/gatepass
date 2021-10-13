import React, { useState } from 'react';

const AdminPage = (props) => {

  // Deletes guest
  const deleteGuest = (e) => {
    fetch('/portal/deleteGuest', {
      method: 'delete',
      body: JSON.stringify({ guestId: e.target.id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        let newArr = props.guestList.filter((entry) => {
          return entry._id !== e.target.id;
        })
        props.setGuestList(newArr);
      })
      .catch(err => console.log('Error: ', err))
  }

  const guests = props.guestList.map(guest => {
    return (
      <tr key={guest._id}>
        <td>{guest.first_name}{guest.last_name}</td>
        <td>{guest.email}</td>
        <td>{guest.phone_number}</td>
        <td>{guest.license_number}</td>
        <td><button className="deleteGuestButton" id={guest._id} onClick={deleteGuest}>DELETE</button></td>
      </tr>
    )
  })

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>GUEST NAME</th>
            <th>EMAIL</th>
            <th>PHONE NUMBER</th>
            <th>LICENSE NUMBER</th>
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