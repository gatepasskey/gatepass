import React, { useState } from 'react';

const AdminPage = (props) => {

  const deleteGuest = (e) => {
    console.log('target: ',e.target.id)
    fetch('/portal/deleteGuest', {
      method:'delete',
      body: JSON.stringify({guestId: e.target.id}),
      headers: {'Content-Type': 'application/json'}
    }).then((res) => {
      let newArr = props.guestList.filter((entry) => {
        return entry._id !== e.target.id;
      })
      props.setGuestList(newArr);
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
        <td><button className="deleteGuestButton" id={guest._id} onClick={deleteGuest}>DELETE</button></td>
      </tr>
    )
  })
  //guests
  // email: "leynasheen@gmail.com"
  // first_name: "Lina"
  // last_name: "Shin"
  // license_number: "456"
  // phone_number: "123"
  // resident_id: "4c4f4dfe-f203-4d78-bef2-3df860747336"
  // _id: "15c96490-2551-4c53-a4e3-35fd19143168"
  // console.log('guests: ', guests)

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