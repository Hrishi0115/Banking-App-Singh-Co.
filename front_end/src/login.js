import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    // declare login functional component with 'onLogin' as a prop - the onLogin prop is a function that should be called when a successful login occurs

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // initialise three state variables using useState
    // username holds the current value of the username input, setUsername is the function to update it, etc. 

    const handleLoginClick = async () => {
        // asynchronous functions allow other tasks to run in parallel - useful since many operations in JS take a long time to complete
        // declare handleLogicClick, a asynchronous function that is called when the logic button is clicked
        // Placeholder for authentication logic
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username,
                password
            });
            // try block attempts to send a POST request to the server with 'username' and 'password' as the payload
            // await is used with axios.post to send an asynchronous HTTP POST request to the specified URL, waiting for the promise to resolve before moving on
            
            if (response.data.message === 'Login successful!') {
                onLogin(username);
            }
            else {
                setError('Login failed');
            }
            // check if the message in the response data indicates a successful login
            // calls 'onLogin(username) if successful, passing the username up for further use.
            // Sets an error state if the message indicates failure
        } catch (error) {
            setError('Invalid username or password');
            // the catch block captures any errors during the login process, such as network issues, server errors and sets an appropriate error message
        }
    };

    return (        
        // start the JSX return block, which defines the layoff of this component

        <div> 
            {/* acts as the main container for the login form */}
            <h2>Login to Your Account</h2>
            {/* username input */}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter username'
                />
                {/* div contains a <label> and <input> element for the username
                input element is of type text, bound to the 'username' state variable, 
                its value updates through the 'onChange' handler, which sets the state to the current input value using 'setUsername' */}
            </div>
            {/* password input */}
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'
                />
                {/* similar to above, but <input> is of type "password" so that the input characters are obscured for privacy */}
            </div>
            {/* Login button */}
            <div>
                <button onClick={handleLoginClick}>Login</button>
            </div>
            {/* <button> element that users click to submit their credentials
            onClick={handleLoginClick} assigns the 'handleLoginClick' function to the buttom's click event, which will trigger when the user clicks this button.*/}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;