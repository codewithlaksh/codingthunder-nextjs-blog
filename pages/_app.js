import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/Header"
import Alert from '../components/Alert';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  useEffect(() => {
    import('jquery/dist/jquery.min.js')
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
    const token = localStorage.getItem("codingthunder");
    if (token) {
      let parsedToken = JSON.parse(token);
      setUser({ token: parsedToken.authtoken, username: parsedToken.username });
      setKey(Math.random())
    }
  }, [router.query])

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  
  const logout = () => {
    localStorage.removeItem('codingthunder');
    showAlert('You have been logged out successfully!', 'success');
    setKey(Math.random());
    setUser({ token: null, username: null })
  }

  return (
    <>
      <Header key={key} user={user} logout={logout}/>
      <Alert alert={alert} />

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
