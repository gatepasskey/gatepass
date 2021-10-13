import React, { useState } from 'react';
import AdminPage from "../components/AdminPage";

const AdminContainer = () => {
  const [resident, setResident] = useState('');
  const [guestList, setGuestList] = useState([]);
  const residentSearch = () => {
    fetch('/portal/getResidentsAndGuests')
      .then(res => res.json())
      .then(data => {
        setGuestList(data);
        console.log(data)
      })
    return
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <input value={resident} onChange={(e) => setResident(e.target.value)} placeholder='SEARCH FOR RESIDENT'></input>
      <button onClick={residentSearch}>GO</button>
      <AdminPage guestList={guestList}/>
    </div>
  )
}

export default AdminContainer;