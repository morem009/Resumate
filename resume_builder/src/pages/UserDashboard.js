import React from 'react';
import Body from '../components/Body';

const UserDashboard = ({userData}) => {

  return (
    <div className="auth-wrapper">
     
    <div className="auth-inner">
      <div  style={{"textAlign": "center","marginTop":"80px"}}>
        <h1>Hi {userData.fname}</h1>
        <Body useremail = {userData.email} ></Body>
      </div>
    </div>
  </div>
  )
}

export default UserDashboard
