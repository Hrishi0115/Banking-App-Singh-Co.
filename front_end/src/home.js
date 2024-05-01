import React from "react";

const Home = ({ currentUser }) => {
    return (
        <div>
            <h1>Welcome to the Home Page, {currentUser}!</h1>
            <p>This is the main area of the application.</p>
        </div>
    );
};

export default Home;