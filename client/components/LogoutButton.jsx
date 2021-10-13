import React from 'react';

const LogoutButton = () => {
  
  const handleLogout = () => {
    fetch('/login/logout')
    .then(window.location.reload())
  }

  return(
    <button onClick={handleLogout}>Log Out</button>
  )
}
export default LogoutButton;