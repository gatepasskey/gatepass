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

  // Automatically redirect to Admin or resident portal on refresh
  // Persistent login session
  useEffect(() => {
    fetch('/login/loginCheck')
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        if (data.message !== 'user logged in') {
          setHasAdminAccess(false);
          setHasResidentAccess(false);
          props.setHasAccess(false);
        } else if (data.type === 'resident') {
          setHasResidentAccess(true);
          props.setHasAccess(true);
        } else if (data.type === 'admin') {
          setHasAdminAccess(true);
          props.setHasAccess(true);
        }
      })
  }, [])

  // Function to submit login form to server
  const submitLogin = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        console.log('data is: ', data)
        if (data === 'resident') {
          setHasResidentAccess(true);
          props.setHasAccess(true);
          setUserId(data.userId);
        } else if (data === 'admin') {
          setHasAdminAccess(true);
          props.setHasAccess(true);
          setUserId(data.userId)
        } else {
          window.alert('Username or password is incorrect');
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div>
        {!hasAdminAccess && !hasResidentAccess &&
          <>
            <h1>WELCOME TO GATEPASS</h1>
            <form className="loginForm" onSubmit={submitLogin}>
              <input id="usernameInput" type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='USERNAME'></input>
              <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='PASSWORD'></input>
              <button className="loginFormButton" id="loginButton" type='submit'>LOGIN</button>
            </form>
          </>
        }
      </div>
      <div>
        {hasResidentAccess && <GuestContainer userId={userId} />}
      </div>
      <div>
        {hasAdminAccess && <AdminContainer userId={userId} />}
      </div>
    </div>
  )
}

export default Login;