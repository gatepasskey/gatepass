import React from'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './Login.jsx'
import GuestPage from './GuestPage.jsx'
import AdminPage from './AdminPage.jsx';
import ChangePassword from './ChangePassword.jsx';
import MainContainer from '../containers/MainContainer.jsx';

const App = () => {
  return (
    <div>
      <MainContainer />
    </div>
  )
}

export default App;