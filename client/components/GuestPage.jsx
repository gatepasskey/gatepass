import React, { useState } from 'react';

const GuestPage = (props) => {
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
        props.refreshGuestList();
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
    <div id='addGuest'>
      <h2>NEW GUEST INFORMATION</h2>
      <input type='text' value={guestFirstName} onChange={e => setGuestFirstName(e.target.value)} placeholder='Guest First Name'></input>
      <input type='text' value={guestLastName} onChange={e => setGuestLastName(e.target.value)} placeholder='Guest Last Name'></input>
      <input type='text' value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder='Guest Email'></input>
      <input type='text' value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder='Guest Phone Number'></input>
      <input type='text' value={guestLicense} onChange={e => setGuestLicense(e.target.value)} placeholder='Guest License Plate Number'></input>
      <button onClick={AddGuest}>Add New Guest</button>
    </div>

  )
}

export default GuestPage;