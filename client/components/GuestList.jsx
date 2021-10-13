import React, { useState, useEffect } from 'react';
// import {createGlobalState} from 'react-hooks-global-state';
import Guest from './Guest';

const GuestList = (props) => {
  return (
    <div className="guestList">
      <h2 id="guestListTitle">GUEST LIST</h2>
      <div>
        {props.guestList}
      </div>
    </div>
  )
};

export default GuestList;