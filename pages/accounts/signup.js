import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Alert from '../../components/Alert';
import { useRouter } from 'next/router';

const Signup = function () {
    const [credentials, setCredentials] = useState({ name: "", email: "", username: "", password1: "", password2: "" });
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
        const response = await fetch('http://localhost:3000/api/signup', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        let data = await response.json();
        showAlert(`${data.message}`, `${data.status}`);
        if (data.status == "success") {
            document.getElementById("signupForm").reset();
            setTimeout(() => {
                router.push('/accounts/login');
            }, 2000);
        }
    }

    return (
        <>
            <Head>
                <title>Signup - CodingThunder</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Alert alert={alert} />
            <div className="container my-3">
                <h2>Register for a new account</h2>
                <form id="signupForm">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter your full name" onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email address" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter unique username" onChange={handleChange} />
                        <small>Make sure not to use existing username.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input type="password" className="form-control" id="password1" placeholder="Enter your password" autoComplete="false" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" className="form-control" id="password2" placeholder="Re-enter your password" autoComplete="false" onChange={handleChange} />
                    </div>
                    <button type="button" className="btn btn-danger" onClick={handleSubmit}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Signup