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

    fetch('/login/changedPassword', {
      method: 'post',
      body: JSON.stringify({ username, password: oldPass, newPassword: newPass, confirmPass }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.message === 'User Not Found') {
          return window.alert('Invalid username or password');
        } else {
          clearFields();
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <div className="changePasswordForm">
      <h1 id="changePasswordHeader">CREATE A NEW PASSWORD</h1>
      <input type='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='USERNAME'></input>
      <input type='password' value={oldPass} onChange={e => setOldPass(e.target.value)} placeholder='OLD PASSWORD'></input>
      <input type='password' value={newPass} onChange={e => setNewPass(e.target.value)} placeholder='NEW PASSWORD'></input>
      <input type='password' value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder='CONFIRM NEW PASSWORD'></input>
      <button id="createNewPasswordButton" onClick={resetPassword}>CREATE NEW PASSWORD</button>
    </div>
  )
};

export default ChangePassword;