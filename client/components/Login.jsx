import React, { useState } from 'react';
// import fetch from 'node-fetch'
import GuestContainer from '../containers/GuestContainer';

const Login = (props) => {
  // Hooks for username and password
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [hasAccess, setHasAccess] = useState(false);

  // Function to submit login form to server
  const submitLogin = (e) => {
    console.log(username, password);
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      // .then(res => res.json())
      .then(data => console.log(data))
      //set hasAccess to true if username password matches
      // .then(res => setUserId({userId}))
      .catch(err => console.error(err));
  }
  // Redirects to change password page
  // const changePassword = () => {
  //   console.log('Changing password')
  //   fetch('/changepassword')
  //     .catch(err => console.log(err))
  // }

  return (
    <div>
      <div>
        {!props.hasAccess &&
          <>
            <h1>Login</h1>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='USERNAME'></input>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='PASSWORD'></input>
            <button onClick={submitLogin}>LOG IN</button>
          </>
        }
      </div>
      <div>
        {props.hasAccess && <GuestContainer userId={userId} />}
      </div>
      <button onClick={() => props.setHasAccess(!props.hasAccess)}>toggle</button>

    </div>
  )
}

export default Login;