
import logo from './images/logo-n.png'
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    //const a = props.a;
    let navigate = useNavigate();
    const Logout = () => {
        window.sessionStorage.clear();
        window.sessionStorage.removeItem("session");
        navigate('/');
    }
    return (
        <div>
            <section style={{ display: "flex", backgroundColor: "#CCF3EE" }}>
                <div className="logo" style={{ display: "flex", width: "60px", height: "60px" }}>
                    <img src={logo} alt="..." />
                </div>
                <nav className="stroke">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/articles">Articles</Link></li>
                        {/* <li><Link to="/for you">For You</Link></li> */}

                        {props.a === "0" ? <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li></> : <><li><Link to="/landing">Dashboard</Link></li><li><Link to='/' onClick={Logout}>Logout</Link></li></>}
                        <li><Link to="/helpline">Helplines</Link></li>
                    </ul>
                </nav>
            </section>

        </div>
    )
}

export default Navbar

