import React, { useState } from 'react';
import PatientContext from "./PatientContext";

const PatientStates = (props) => {
    const host = "http://localhost:5000";

    const [errorMessages, setErrorMessages] = useState([]);


    const patientInitial = []; // Initial state for patients

    const [patients, setPatients] = useState(patientInitial);

    // Fetch all patients for the user
    const getPatientInfo = async () => {
        try {
            // API Call
            const response = await fetch(`${host}/api/patient/viewpatient`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Parse JSON response
            const json = await response.json();

            // Update the state with fetched data
            if (json.success && JSON.stringify(json.patientsInfo) !== JSON.stringify(patients)) {
                setPatients(json.patientsInfo);
            } else {
                console.log("No new patient data");
            }
        } catch (error) {
            console.error("Error fetching patient information:", error);
        }


    };

    //fetch patient information for admin
    const fetchPatientInfo = async () => {
        try {
            // API Call
            const response = await fetch(`${host}/api/patient/fetchpatient`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
            });

            // Parse JSON response
            const json = await response.json();
            console.log(json);

            // Update the state with fetched data
            if (json.success && JSON.stringify(json.patientsInfo) !== JSON.stringify(patients)) {
                setPatients(json.patientsInfo);
            } else {
                console.log("No new patient data");
            }
        } catch (error) {
            console.error("Error fetching patient information:", error);
        }



    };



    //Add Patient for admin using
    const addPatient = async (patientData) => {

        try{
            const response = await fetch(`${host}/api/patient/addpatient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify(patientData),

            });
            const json = await response.json();
            if (json.success) {
                setPatients((prev) => [...prev, json.patientsInfo.savedPatient]);
                getPatientInfo();

            }


        }catch (error) {
            console.error("Error adding patient information:", error);
        }


    };


    //Update Patient for admin using
    const updatePatient = async (id, patientName, dateOfBirth, patientGender, patientMobile, presentAddress, permanentAddress) => {
        try {
            const response = await fetch(`${host}/api/patient/updatepatient/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({patientName, dateOfBirth, patientGender, patientMobile, presentAddress, permanentAddress}),
            });
            const json = await response.json();
            console.log(json);
            if (json.success){
                alert("Information updated successfully");
                setErrorMessages(null);

            let newPatient = JSON.parse(JSON.stringify(patients));
            //logic to edit in client
            for(let index=0; index<patients.length; index++) {
                const element = newPatient[index];
                if (element._id === id) {
                    newPatient[index].patientName = patientName;
                    newPatient[index].dateOfBirth = dateOfBirth;
                    newPatient[index].patientGender = patientGender;
                    newPatient[index].patientMobile = patientMobile;
                    newPatient[index].presentAddress = presentAddress;
                    newPatient[index].permanentAddress = permanentAddress;
                    break;
                }
            }
            setPatients(newPatient);
            }else {
                console.log(json.error);
                // Handle errors from backend
                setErrorMessages(json.errors || json.message || "An error occurred");


            }


        }catch (error) {
            console.error("Error updating patient information:", error);

        }

    }

    //delete information

    const deletePatient = async (id) => {
        try {
            const response = await fetch(`${host}/api/patient/deletepatient/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },

            });
            const json = await response.json();
            console.log(json);
            if (json.success){
                setPatients((prevPatients)=>prevPatients.filter(patient=>patient._id !== id));
                alert("Patient delete successfully");
            }else {
                console.log("Patient deletion failed:", json.message);
            }
        }catch (error) {
            console.error("Error deleting patient information:", error);

        }
    }


    return (
        <PatientContext.Provider value={{ patients, getPatientInfo,fetchPatientInfo, addPatient,updatePatient, deletePatient }}>
            {props.children}
        </PatientContext.Provider>
    );
};

export default PatientStates;
