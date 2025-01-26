import React, { useState } from 'react';

const Login = () => {
    // Declare state variables for email, password, and the response message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    // Handle form submission
    const handleLogin = (e) => {
        e.preventDefault();

        // Prepare the data to be sent to the server
        const data = {
            email: email,
            password: password,
        };

        console.log("Login Attempt:", data);

        // Send the data to the server
        const apiUrl = 'http://51.20.6.199:4000/login';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
                // Set the response message based on the API response
                setResponseMessage(data.message);

                if (data.status === 'success') {
                    console.log('Login successful:', data);
                } else {
                    console.error('Login failed:', data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setResponseMessage('An error occurred while logging in.');
            });
    };

    return (
        <div>
            {/* Display the response message on the page */}
            <div className='notice'>
                <h2>{responseMessage}</h2>
            </div>

            <h2>Login</h2>
            <form id="loginForm" onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
