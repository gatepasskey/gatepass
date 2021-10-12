import React, { useState, useEffect } from 'react';
// import fetch from 'node-fetch'
import GuestContainer from '../containers/GuestContainer';
import AdminContainer from '../containers/AdminContainer';

const Login = (props) => {
  // Hooks for username and password
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasResidentAccess, setHasResidentAccess] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  useEffect(() => {
    fetch('/login/loginCheck')
    .then(res => res.json())
    .then(data => {
      console.log('data',data);
      if(data !== 'user logged in'){
        setHasAdminAccess(false);
        setHasResidentAccess(false);
      }
    })
  },[])

  // Function to submit login form to server
  const submitLogin = (e) => {
    // setHasResidentAccess(true)
    // console.log(username, password);
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        // console.log('data is: ', data)
        if (data === 'resident') {
          setHasResidentAccess(true);
          setUserId(data.userId);
        } else if (data === 'admin') {
          setHasAdminAccess(true)
          setUserId(data.userId)
        } else {
          window.alert('username or password is incorrect');
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div>
        {!hasAdminAccess && !hasResidentAccess &&
          <>
            <h1>Login</h1>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='USERNAME'></input>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='PASSWORD'></input>
            <button onClick={submitLogin}>LOG IN</button>
          </>
        }
      </div>
      <div>
        {/* SWAP THESE */}
        {hasResidentAccess && <GuestContainer userId={userId} />}
      </div>
      <div>
        {hasAdminAccess && <AdminContainer userId={userId} />}
      </div>

    </div>
  )
}

export default Login;