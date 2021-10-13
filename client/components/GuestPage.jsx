import React, { useState } from 'react';

const GuestPage = () => {
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestLicense, setGuestLicense] = useState('');
  const AddGuest = () => {
    if (!guestFirstName || !guestLastName || !guestEmail || !guestPhone || !guestLicense) {
      window.alert('Input fields cannot be empty.')
    } else {
      fetch('portal/addNewGuest', {
        method: 'post',
        body: JSON.stringify({ guestFirstName, guestLastName, guestEmail, guestPhone, guestLicense }),
        headers: { 'Content-type': 'application/json' }
      }).then(() => {
        clearFields();
      })
        .catch(err => console.log(err))
    }
  }

  const clearFields = () => {
    setGuestFirstName('');
    setGuestLastName('');
    setGuestEmail('');
    setGuestPhone('');
    setGuestLicense('');
  }

  return (
    <div className="addGuestForm">
      {/* <h1 className="guestHeader">NEW GUEST INFORMATION</h1> */}
      <input type='text' value={guestFirstName} onChange={e => setGuestFirstName(e.target.value)} placeholder='FIRST NAME'></input>
      <input type='text' value={guestLastName} onChange={e => setGuestLastName(e.target.value)} placeholder='LAST NAME'></input>
      <input type='text' value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder='EMAIL'></input>
      <input type='text' value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder='PHONE NUMBER'></input>
      <input type='text' value={guestLicense} onChange={e => setGuestLicense(e.target.value)} placeholder='LICENSE PLATE NUMBER'></input>
      <button id="addNewGuestButton" onClick={AddGuest}>ADD NEW GUEST</button>
    </div>

  )
}

export default GuestPage;