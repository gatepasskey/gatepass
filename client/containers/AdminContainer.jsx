import React, { useState } from 'react';
import AdminPage from "../components/AdminPage";

const AdminContainer = () => {
  const [resident, updateResident] = useState('');
  const residentSearch = () => {
    fetch('')
    return 
  }

  return (
    <div>
      <input value={resident} onChange={(e) => updateResident(e.target.value)}placeholder='SEARCH FOR RESIDENT'></input>
      <button onClick={residentSearch}>GO</button>
      <AdminPage />
    </div>
  )
}

export default AdminContainer;