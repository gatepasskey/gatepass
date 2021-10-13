import React from 'react';

const LogoutButton = () => {
  
  const handleLogout = () => {
    fetch('/login/logout')
    .then(window.location.reload())
  }

  return(
    <button id="logoutButton" onClick={handleLogout}>LOG OUT</button>
  )
}
export default LogoutButton;