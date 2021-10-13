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
        console.log(data)
      })
    return
  }
  //resident
  //   address: "123 Here"
  // admin: false
  // password: "resident1"
  // phone_number: "12345678910"
  // username: "resident1"
  // _id: "4c4f4dfe-f203-4d78-bef2-3df860747336"

  return (
    <div className="mainContainer">
      <h1 id="adminHeader">GATEPASS ADMIN</h1>
      <LogoutButton />
      <form className="adminForm" onSubmit={residentSearch}>
        <input id="adminSearch" value={residentAddress} onChange={(e) => setResidentAddress(e.target.value)} placeholder='SEARCH RESIDENT UNIT'></input>
        <button type='submit'>SEARCH</button>
      </form>
      <div>{userInfo.username} {userInfo.address} {userInfo.phone_number}</div>
      <AdminPage guestList={guestList} setGuestList={setGuestList} />
    </div>
  )
}

export default AdminContainer;