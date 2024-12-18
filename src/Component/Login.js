import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure headers are correct
                },
                body: JSON.stringify(credentials), // Send credentials in the body
            });

            if (response.ok) {
                const json = await response.json();
                console.log('Login Successful:', json);

                // Store token in localStorage
                localStorage.setItem('token', json.authtoken);

                // Navigate to the home page
                navigate('/adminhome');
            } else {
                const errorMessage = await response.json();
                setError(errorMessage.message || 'Invalid login credentials');
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div>
            <div className="container my-3">
                <h2>Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange} // Update state dynamically
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange} // Update state dynamically
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
