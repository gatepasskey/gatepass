import React, { useState } from 'react';
import AdminPage from "../components/AdminPage";
import LogoutButton from '../components/LogoutButton';

const AdminContainer = () => {
  const [residentAddress, setResidentAddress] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    address: '',
    phone_number: '',
    username: '',
  })
  const residentSearch = (e) => {
    e.preventDefault();
    fetch('/portal/getResidentsAndGuests', {
      method: 'post',
      body: JSON.stringify({ residentAddress }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo({
          address: data.residentInfo.address,
          phone_number: data.residentInfo.phone_number,
          username: data.residentInfo.username
        })
        setGuestList(data.guests);
      })
    return
  }

  return (
    <div className="mainContainer">
      <h1 id="adminHeader">GATEPASS ADMIN</h1>
      <LogoutButton />
      <form className="adminForm" onSubmit={residentSearch}>
        <input id="adminSearch" value={residentAddress} onChange={(e) => setResidentAddress(e.target.value)} placeholder='SEARCH RESIDENT UNIT'></input>
        <button type='submit'>SEARCH</button>
      </form>
      {userInfo.username.length ?
        <div id="residentInfo">Current Resident: {userInfo.username}, {userInfo.address}, {userInfo.phone_number}</div>
        : null
      }
      <AdminPage guestList={guestList} setGuestList={setGuestList} />
    </div>
  )
}

export default AdminContainer;