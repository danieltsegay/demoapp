import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployee = () => {
    // Declare a state variable for each of the form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Prepare the data to be sent to the server
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };

        console.log("Employee Added:", data);

        // Send the data to the server
        const apiUrl = 'http://51.20.6.199:4000/add-employee';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <form id="addEmployeeForm" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required
                />
                <br />
                <br />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required
                />
                <br />
                <br />

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

                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
