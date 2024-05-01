import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from "./login";
import Register from './register';
import Home from './home';


// component: in React is a resusable piece of code that represents a part of the user interface.
// It acts like a JavaScript function/class that can accepts inputs (props) and returns React elements describing what should appear on the screen.
// e.g. components can be as simple as a single button or as compelx as an entire app's layout.

// state: refers to data that can change over time within a component. Unlike props, which are passed to components by their parent and are immutable from the component's perspective, state is managed within the component itself.
// State changes can occur as a result of user actions, API calls, etc., and when the state changes, the component re-renders to reflect the new state.

// hook: a special function that lets you "hook into" React features from function components. One of the most common hooks is 'useState', which allows a function component to have state. 

function App() {
  // declare a functional component named 'App'
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  // isLoggedIn: a boolean state that keeps track of whether the user is logged in. Initialised to 'false'
  const [currentUser, setCurrentUser] = useState('');
  // currentUser: a string state that holds the username of the currently logged-in user - initialised to an empty string
  // useState initialises the state and provides a setter function (like setIsLoggedIn and setCurrentUser) to update that state
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    // function is triggered when a succesful login occurs 
  };

  const toggleAuthPage = () => setShowLogin(!showLogin); // toggle between login and registration

  // Below: orginally IsLoggedIn is false but after the Login function is executed with onLogin = handleLogin which setIsLoggedIn(true); then after this happens since IsLoggedIn is now true we exeute the ifExprFalse part which loads the Welcome, {currentUser}.

  return (
    <div className='App'>
      <header className='App-header'>
        <Routes>
          {IsLoggedIn ? (
            <>
              <Route path="/home" element={<Home currentUser={currentUser} />} />
              <Route path="*" element={<Navigate replace to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </>
          )}
        </Routes>
      </header>
    </div>
  );
};

export default App;