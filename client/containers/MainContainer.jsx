import React, { useState } from 'react';
import Login from '../components/Login.jsx';
import ChangePassword from '../components/ChangePassword.jsx';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const MainContainer = () => {
  const [viewResetPassword, setViewResetPassword] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  return (
    <div className="login">
      {!viewResetPassword && <Login hasAccess={hasAccess} setHasAccess={setHasAccess} />}
      {viewResetPassword && <ChangePassword />}
      {!hasAccess && <button className="loginFormButton" onClick={() => { setViewResetPassword(!viewResetPassword) }}>{(!viewResetPassword) ? "CREATE NEW PASSWORD" : "RETURN TO LOGIN"}</button>}
      {/* <button onClick={() => {setViewChangePassword(!viewChangePassword)}}>Change Password</button> */}

    </div>
  )
};

export default MainContainer;