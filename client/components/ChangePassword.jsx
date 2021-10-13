import React, { useState } from 'react';

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const clearFields = () => {
    setUsername('');
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  }
  // reset password handler
  const resetPassword = () => {
    if (!username || !oldPass || !newPass || !confirmPass) {
      return window.alert('Fields may not be empty');
    }
    //Add conditional check with confirmpass and newpass before fetch
    if (newPass !== confirmPass) {
      return window.alert('Passwords do not match');
    }
    if (oldPass == newPass) {
      return window.alert('New password cannot be the same as current password.')
    }
    //Add check to see if current password is correct

    fetch('/login/changedPassword', {
      method: 'post',
      body: JSON.stringify({ username, password: oldPass, newPassword: newPass, confirmPass }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.message === 'User Not Found') {
          return window.alert('Invalid Username/Password combination');
        } else {
          clearFields();
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <div>
      <h2>PLEASE CREATE A NEW PASSWORD</h2>
      <input type='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='USERNAME'></input>
      <input type='password' value={oldPass} onChange={e => setOldPass(e.target.value)} placeholder='Current Password'></input>
      <input type='password' value={newPass} onChange={e => setNewPass(e.target.value)} placeholder='New Password'></input>
      <input type='password' value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder='Confirm your password'></input>
      <button onClick={resetPassword}> Reset Password</button>
    </div>
  )
};

export default ChangePassword;