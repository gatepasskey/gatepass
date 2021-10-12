import React from 'react';
import GuestPage from '../components/GuestPage.jsx'
import GuestList from '../components/GuestList.jsx'


const GuestContainer = (props) => {
  return (
    <div>
      <GuestPage userId={props.userId}/>
      <GuestList userId={props.userId}/>
    </div>
  )
}

export default GuestContainer;