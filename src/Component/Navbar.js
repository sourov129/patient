import React from "react";
import {Link, useNavigate} from "react-router-dom";



const Navbar = () => {

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/home');
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">Sheba Hospital</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/home">Display Patient
                                    Information</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/adminhome">Admin Home</a>
                            </li>



                        </ul>

                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form>: <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>}


                    </div>
                </div>
            </nav>








        </div>
    )
};

export default Navbar;