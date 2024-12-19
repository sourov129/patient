import React, {useEffect, useContext,useRef, useState} from 'react';
import PatientContext from "../Context/PatientContext";
import AdminHome from "./AdminHome";


const FetchInfo = () => {
    const { patients, setPatients, fetchPatientInfo, deletePatient, updatePatient } = useContext(PatientContext);

    const [prepatient, setPrepatient] = useState({ patientName: "", patientGender: "", patientMobile: "", presentAddress: "", permanentAddress: "", dateOfBirth: "" });
    const [currentPatientId, setCurrentPatientId] = useState(null);

    const ref = useRef(null);
    const refclose = useRef(null);


    // Fetch patient data when the component mounts
    useEffect(() => {
        if (patients.length === 0) {  // Fetch only if the patients array is empty
            fetchPatientInfo();
        }
    }, [patients.length, fetchPatientInfo]);

    const updateInformation = (currentPatient) => {
        ref.current.click();
        const formattedDate = currentPatient.dateOfBirth
            ? new Date(currentPatient.dateOfBirth).toISOString().split('T')[0] // Format date to "yyyy-MM-dd"
            : ""; // Handle cases where dateOfBirth is not set

        setPrepatient({
            id: currentPatient._id,
            patientName: currentPatient.patientName,
            dateOfBirth: formattedDate,
            patientGender: currentPatient.patientGender,
            patientMobile: currentPatient.patientMobile,
            presentAddress: currentPatient.presentAddress,
            permanentAddress: currentPatient.permanentAddress,
        });
        setCurrentPatientId(currentPatient._id);
    };


    const handleUpdate = () => {
        refclose.current.click();
        const formattedDate = prepatient.dateOfBirth
            ? new Date(prepatient.dateOfBirth).toISOString()
            : null; // Ensure correct format

        updatePatient(
            currentPatientId,
            prepatient.patientName,
            formattedDate,
            prepatient.patientGender,
            prepatient.patientMobile,
            prepatient.presentAddress,
            prepatient.permanentAddress
        );
    };


    const onChange = (e) => {
        setPrepatient({ ...prepatient, [e.target.name]: e.target.value });
    }




    return (


        <div>
            <AdminHome/>
            <div className="container">
                <h2 className="text-center mb-5">Patient Details</h2>

                <div className="container text-left">
                    <div className="row">
                        {/* Check if patients array is not empty */}
                        {patients.length > 0 ? (
                            patients.map((patient, index) => (
                                <div className="col-sm" key={index}>
                                    <div className="card shadow p-3 mb-5 bg-body-tertiary rounded"
                                         style={{width: "18rem"}}>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <h5 className="card-title text-center">Personal Info.</h5>
                                                <button
                                                    className="btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onClick={() => updateInformation(patient)}
                                                    role="button">
                                                    <i className="fa-solid fa-pen-to-square"
                                                       style={{cursor: "pointer"}}></i>
                                                </button>
                                                <button
                                                    className="btn"
                                                    onClick={() => deletePatient(patient._id)} // Call deletePatient with the patient ID

                                                    role="button">
                                                    <i className="fa-solid fa-trash"
                                                       style={{cursor: "pointer"}}>
                                                    </i>
                                                </button>
                                                <button ref={ref} type="button" className="btn btn-primary d-none"
                                                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Launch demo modal
                                                </button>

                                                <div className="modal fade" id="exampleModal" tabIndex="-1"
                                                     aria-labelledby="updateModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5"
                                                                    id="updateModalLabel">Update Patient
                                                                    Information</h1>
                                                                <button type="button" className="btn-close"
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form className="row g-3">
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="epatientName"
                                                                               className="form-label">Name</label>
                                                                        <input type="text" className="form-control"
                                                                               id="epatientName" name="patientName"
                                                                               value={prepatient.patientName}
                                                                               onChange={onChange} required/>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="epatientGender"
                                                                               className="form-label">Gender</label>
                                                                        <select className="form-select"
                                                                                id="epatientGender" name="patientGender"
                                                                                value={prepatient.patientGender}
                                                                                onChange={onChange} required>
                                                                            <option value="" disabled>Select Gender
                                                                            </option>
                                                                            <option value="Male">Male</option>
                                                                            <option value="Female">Female</option>
                                                                            <option value="Other">Other</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="epatientMobile"
                                                                               className="form-label">Mobile</label>
                                                                        <input type="text" className="form-control"
                                                                               id="epatientMobile" name="patientMobile"
                                                                               value={prepatient.patientMobile}
                                                                               onChange={onChange} required/>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="epatientDateOfBirth"
                                                                               className="form-label">Date of
                                                                            Birth</label>
                                                                        <input
                                                                            type="date"
                                                                            className="form-control"
                                                                            id="epatientDateOfBirth"
                                                                            name="dateOfBirth"
                                                                            value={prepatient.dateOfBirth || ''}
                                                                            onChange={onChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="epresentAddress"
                                                                               className="form-label">Present
                                                                            Address</label>
                                                                        <input type="text" className="form-control"
                                                                               id="epresentAddress"
                                                                               name="presentAddress"
                                                                               value={prepatient.presentAddress}
                                                                               onChange={onChange} required/>
                                                                    </div>

                                                                    <div className="col-12">
                                                                        <label htmlFor="epermanentAddress"
                                                                               className="form-label">Permanent
                                                                            Address</label>
                                                                        <input type="text" className="form-control"
                                                                               id="epermanentAddress"
                                                                               name="permanentAddress"
                                                                               value={prepatient.permanentAddress}
                                                                               onChange={onChange} required/>
                                                                    </div>

                                                                </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button ref={refclose} type="button"
                                                                        className="btn btn-secondary"
                                                                        data-bs-dismiss="modal">Close
                                                                </button>
                                                                <button type="button" className="btn btn-primary"
                                                                        onClick={handleUpdate}>Update Information

                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="container">
                                                <p className="card-text text-truncate">Name: {patient.patientName}</p>
                                                <p className="card-text">Age: {patient.patientAge}</p>
                                                <p className="card-text">Gender: {patient.patientGender}</p>
                                                <p className="card-text">Mobile: {patient.patientMobile}</p>
                                                <p className="card-text text-truncate">Present Address: {patient.presentAddress}</p>
                                                <p className="card-text text-truncate">Permanent
                                                    Address: {patient.permanentAddress}</p>
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
        </div>
    );
};

export default FetchInfo;
