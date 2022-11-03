import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Alert from '../../components/Alert';
import { useRouter } from 'next/router';

const Login = function () {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [alert, setAlert] = useState(null);
    const [tokenIsNull, setTokenIsNull] = useState(true);
    const router = useRouter();

    const handleChange = (e) => {
        setCredentials(credentials => ({ ...credentials, [e.target.id]: `${e.target.value}` }))
    }

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    useEffect(() => {
        getUserToken();
    })
    
    const getUserToken = () => {
        let token = localStorage.getItem('codingthunder');
        if (token != null) {
            setTokenIsNull(false);
            if (tokenIsNull == false) {
                router.push('/accounts/myaccount')
            }
        } else {
            setTokenIsNull(true);
        }
    }

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        let data = await response.json();
        showAlert(`${data.message}`, `${data.status}`);
        if (data.status == "success") {
            localStorage.setItem('codingthunder', JSON.stringify({ authtoken: data.token, username: data.username }));
            document.getElementById("loginForm").reset();
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
    }

    return (
        <>
            <Head>
                <title>Login - CodingThunder</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Alert alert={alert} />
            <div className="container my-3">
                <h2>Login using your credentials</h2>
                <form id="loginForm">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" autoComplete="false" onChange={handleChange} />
                    </div>
                    <button type="button" className="btn btn-danger" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login