import React, { useState } from 'react';

const AdminPage = (props) => {
  const guests = props.guestList.map(guest => {
    <tr>
      <td>{guest.first_name}{guest.last_name}</td>
      <td>{guest.email}</td>
      <td>{guest.phone}</td>
      <td>{guest.license}</td>
      <td>{guest.address}</td>
    </tr>
  })

  return (
    <>
      <table>
        <tr>
          <th>GUEST</th>
          <th>EMAIL</th>
          <th>PHONE</th>
          <th>LICENSE</th>
          <th>ADDRESS</th>
        </tr>
        {guests}
      </table>
    </>
  )
};

export default AdminPage;