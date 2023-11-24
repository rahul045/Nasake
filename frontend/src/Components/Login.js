import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

import { Link } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    let navigate = useNavigate();

    const loginUser = async (e) => {
        // console.log(email, password);
        const resp = await fetch("https://rahul045.pythonanywhere.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        if (resp.status !== 200) {
            console.log();
            navigate('/error');
            return resp.json();
        }

        // const setSession('');
        window.sessionStorage.setItem('session', email)
        navigate('/landing');

    }
    return (
        <>
            <div>
                <Navbar a="0" />

            </div>

            <div className="ctr" >
                <div className="card ctr" style={{ width: "400px", margin: "auto" }}>
                    <img src="https://ca-times.brightspotcdn.com/dims4/default/bb60523/2147483647/strip/true/crop/2000x1333+0+0/resize/2000x1333!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8e%2Fb7%2F99beae9a4be0bbced1487b04b619%2Fla-hm-nyny-mental-health.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">LOGIN</h5>
                        <div className="inp"><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="input-email" placeholder='Enter your email' /></div>
                        <div className="inp"> <input className="input" type="password" value={password} onChange={(e) => setPass(e.target.value)} id="input-password" placeholder='Enter your password' /></div>
                        <Link href="/home" className="btn btn-primary" onClick={loginUser}>LOGIN</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login