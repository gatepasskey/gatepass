import React, { useState } from 'react';


const Guest = (props) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <span>
      <div onClick={() => setShowInfo(!showInfo)}>{props.firstName} {props.lastName}</div>
      {showInfo &&
        
          <div>{props.email}</div>
        
      }

    </span>
  )
};

export default Guest;