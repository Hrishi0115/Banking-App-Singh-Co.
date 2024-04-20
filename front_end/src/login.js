import React, { useState } from 'react';
import axios from 'axios';
import './login.css';



const Login = ({ onLogin }) => {
    // declare login functional component with 'onLogin' as a prop - the onLogin prop is a function that should be called when a successful login occurs

    const [username, setUsername] = useState(''); 
    // sets username to '', can update username with e.g. setUsername('peterpan') -> username = 'peterpan' - useState creates the setter and variable
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

        <div className='login-container'> 
            {/* acts as the main container for the login form */}
            <h2>Login to Your Account</h2>
            {/* username input */}
            <div>
                <input
                    className='login-input'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                />
                {/* value is what the input display will show - in this case it shows the most up-to-date value of 'username'.
                onChange is an event listener that is triggered every time the user types into the input box. The event (e) contains detail about the change. Here, e.target.value represents the current value of the input field after any change.
                setUsername(e.target.value) updates the state of username to the latest value typed by the user*/}
            </div>
            {/* password input */}
            <div>
                <input
                    className='login-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                {/* similar to above, but <input> is of type "password" so that the input characters are obscured for privacy */}
            </div>
            {/* Login button */}
            <div>
                <button className="login-button" onClick={handleLoginClick}>Login</button>
            </div>
            {/* <button> element that users click to submit their credentials
            onClick={handleLoginClick} assigns the 'handleLoginClick' function to the buttom's click event, which will trigger when the user clicks this button.*/}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* so when button is clicked - then the function defined above handleLoginClick is called */}
            {/* the && operator - for conditional rendering - first evaluates the expression before && - if it is truthy (not null - empty string) then React will process and render the element on the right side of the && operator - here the red error message.*/}
        </div>
    );
};

export default Login;

// 