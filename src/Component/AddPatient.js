import React, { useContext, useEffect, useState } from 'react';
import AdminHome from "./AdminHome";
import { useNavigate } from "react-router-dom";
import PatientContext from "../Context/PatientContext";

const AddPatient = (props) => {
    const host = "http://localhost:5000";

    let navigate = useNavigate();
    const { addPatient } = useContext(PatientContext); // Use addPatient from context

    const [errorMessages, setErrorMessages] = useState([]); // State to store error messages
    const [showAlert, setShowAlert] = useState(false); // State to show/hide alert


    const [formData, setFormData] = useState({
        patientName: "",
        dateOfBirth: "",
        patientGender: "",
        patientMobile: "",
        permanentAddress: "",
        presentAddress: ""
    });

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data if necessary
        if (!formData.patientName || !formData.dateOfBirth || !formData.patientGender || !formData.patientMobile || !formData.presentAddress || !formData.permanentAddress) {
            alert("Please fill all the fields");
            return;
        }

        try {
            const response = await fetch(`${host}/api/patient/addpatient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify(formData),
            });

            const json = await response.json();

            // Check if the response contains the expected data
            if (json.success && json.savedPatient) {
                setFormData({
                    patientName: "",
                    dateOfBirth: "",
                    patientGender: "",
                    patientMobile: "",
                    presentAddress: "",
                    permanentAddress: ""
                }); // Reset form fields
                alert("Patient added successfully!");
                // navigate("/adminhome"); // Redirect to Admin Home
            } else {
                console.error("Error in response:", json);
                if (json.errors) {
                    setErrorMessages(json.errors.map((err) => err.msg)); // Capture error messages
                }
                setShowAlert(true); // Show alert for errors
                setTimeout(() => setShowAlert(false), 5000); // Hide alert after 5 seconds
            }
        } catch (error) {
            console.error("Error adding patient information:", error);
            alert("Failed to add patient. Please try again.");
        }
    };


    return (
        <div>
            <AdminHome />

            <div className="my-5">

                {showAlert && errorMessages.length > 0 && (
                    <div className="alert alert-danger" role="alert">
                        <ul>
                            {errorMessages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="patientName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="patientName" name="patientName"
                               value={formData.patientName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="patientGender" className="form-label">Gender</label>
                        <select className="form-select" id="patientGender" name="patientGender"
                                value={formData.patientGender} onChange={handleChange} required>
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="patientMobile" className="form-label">Mobile</label>
                        <input type="text" className="form-control" id="patientMobile" name="patientMobile"
                               value={formData.patientMobile} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth"
                               value={formData.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <label htmlFor="permanentAddress" className="form-label">Permanent Address</label>
                        <input type="text" className="form-control" id="permanentAddress" name="permanentAddress"
                               value={formData.permanentAddress} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <label htmlFor="presentAddress" className="form-label">Present Address</label>
                        <input type="text" className="form-control" id="presentAddress" name="presentAddress"
                               value={formData.presentAddress} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Add Patient</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatient;
