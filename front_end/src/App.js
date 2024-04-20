import React, { useState } from 'react';
import Login from "./login";
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

  const handleLogin = (username) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    // function is triggered when a succesful login occurs 
  };

  // Below: orginally IsLoggedIn is false but after the Login function is exectured with onLogin = handleLogin which setIsLoggedIn(true); then after this happens since IsLoggedIn is now true we exeute the ifExprFalse part which loads the Welcome, {currentUser}.

  return (
    // begins the return statement of the component, which specifies the JSX structure to be rendered to the DOM
    <div className='App'>
      <header className='App-header'>
        {/* Ternary Operator: condition ? exprIfTrue : exprIfFalse - */}
        <h1>Banking Application</h1>
        {!IsLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div>
            <p>Welcome, {currentUser}!</p>
          </div>
        )}
        {/* ternary operator (?:) for conditional rendering based on the isLoggedIn state */}
        {/* if isLoggedIn is false (!IsLoggedIn) then the 'handleLogin' function is passed to it through props*/}
        {/* if isLoggedIn is true (else) then a greeting message is displayed welcoming the 'currentUser' */}
      </header>
    </div>
  );
};

export default App;