import React from 'react';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name, email, password, cpassword} = credentials;

        // Check if passwords match
        if (password !== cpassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password}),
            });
            const json = await response.json();
            console.log( json);

            if (json.success) {
                // Save token and navigate to home
                localStorage.setItem("token", json.token);
                navigate("/adminhome");
            }
            else {
                const errorMessage = json.errors || "Invalid Details";
                setError(errorMessage); // Show the backend error
            }

        }catch(error){
            setError("An unexpected error occurred. Please try again later.");
            console.error("SignUp Error:",error);
        }




    };


    return (
        <div>
            <div className="container my-3">
                <h2 className="mb-3">Signup</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name"
                               aria-describedby="emailHelp" value={credentials.name}  onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control"  id="email" name="email"
                               aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control"  id="password" name="password" value={credentials.password} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control"  id="cpassword" name="cpassword" value={credentials.cpassword} onChange={handleChange} required/>
                    </div>


                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>


    )
};

export default SignUp;