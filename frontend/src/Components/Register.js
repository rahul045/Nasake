import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [name, setName] = useState("");
    let navigate = useNavigate();

    const registerUser = async () => {
        // console.log(email, password, name);
        const resp = await fetch("https://rahul045.pythonanywhere.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })

        if (resp.status !== 200) {
            console.log(resp.json());
            navigate('/error');

        }
        navigate('/login');
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
                        <h5 className="card-title">CREATE ACCOUNT</h5>
                        <div className="inp"><input className="input" type="text" value={name} id="input-name" onChange={(e) => setName(e.target.value)} placeholder='Enter your name' /></div>
                        <div className="inp"><input className="input" type="email" value={email} id="input-email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /></div>
                        <div className="inp"> <input className="input" type="password" value={password} id="input-password" onChange={(e) => setPass(e.target.value)} placeholder='Enter your password' /></div>
                        <Link to="/" className="btn btn-primary" onClick={registerUser}>REGISTER</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;