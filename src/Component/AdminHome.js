import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const AdminHome = () => {
    let navigate = useNavigate();

    useEffect( () => {
        if(!localStorage.getItem("token")){
            navigate("/login");

        }}, []);

    return (
        <div>
            <h1 className="text-center my-3">Admin Home</h1>
            <div className="container d-flex">
                <Link className="btn btn-outline-primary mx-2" to="/addpatient" role="button">Add Patient</Link>
                <Link className="btn btn-outline-success mx-2" to="/fetchinfo" role="button">View patient Info</Link>

            </div>

        </div>

    )
};

export default AdminHome;