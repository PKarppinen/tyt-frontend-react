import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(creds, setToken) {
    var credentials = "username=" + creds.username + "&password=" + creds.password;            
    console.log("Creds: " + credentials);

    fetch(`https://localhost:8443/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: credentials,
        redirect: 'follow',
        credentials: 'include'
    }).then(function (response) {
        console.log("Authenticated");
        var token = window.btoa(creds.username + ':' + creds.password);
        console.log("Got token: " + token);
        setToken(token);
    }).catch(error => {
        console.error("Authentication error: " + error);
        alert("Authentication failed.")
    });
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
          username,
          password
        }, setToken);        
      }

    return (    
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};