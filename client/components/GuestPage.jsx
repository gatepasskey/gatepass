import React, { useState } from 'react';

const GuestPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [license, setLicense] = useState('');
  const AddGuest = () => {
    if (!name || !email || !phone || !license) {
      window.alert('Input fields cannot be empty.')
    } else {
      fetch('/addGuest', {
        method: 'post',
        body: JSON.stringify({ name, email, phone, license }),
        headers: { 'Content-type': 'application/json' }
      })
        .catch(err => console.log(err))
    }
  }
  return (
    <div id='addGuest'>
      <h2>NEW GUEST INFORMATION</h2>
      <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='First Name'></input>
      <input type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'></input>
      <input type='text' value={phone} onChange={e => setPhone(e.target.value)} placeholder='Phone Number'></input>
      <input type='text' value={license} onChange={e => setLicense(e.target.value)} placeholder='License Plate Number'></input>
      <button onClick={AddGuest}>Add New Guest</button>
    </div>

  )
}

export default GuestPage;