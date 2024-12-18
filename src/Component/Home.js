import React, { useEffect, useContext } from 'react';
import PatientContext from "../Context/PatientContext";

const Home = () => {
    const { patients, getPatientInfo } = useContext(PatientContext);

    // Fetch patient data when the component mounts
    useEffect(() => {
        getPatientInfo();
    }, [getPatientInfo]);

    return (
        <div className="container m-5">
            <h2 className="text-center">Patient Details</h2>

            <div className="container text-left">
                <div className="row">
                    {/* Check if patients array is not empty */}
                    {patients.length > 0 ? (
                        patients.map((patient, index) => (
                            <div className="col-sm" key={index}>
                                <div className="card shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: "18rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Name: {patient.patientName}</h5>
                                        <div className="container">
                                            <p className="card-text">Age: {patient.patientAge}</p>
                                            <p className="card-text">Gender: {patient.patientGender}</p>
                                            <p className="card-text">Mobile: {patient.patientMobile}</p>
                                            <p className="card-text">Present Address: {patient.presentAddress}</p>
                                            <p className="card-text">Permanent Address: {patient.permanentAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No patient data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
