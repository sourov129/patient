import React, { useState } from 'react';
import PatientContext from "./PatientContext";

const PatientStates = (props) => {
    const host = "http://localhost:5000";

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
            if (json.success) {
                setPatients(json.patientsInfo); // Update the state with patientsInfo array
            } else {
                console.error("Failed to fetch patients data");
            }
        } catch (error) {
            console.error("Error fetching patient information:", error);
        }


    };

    return (
        <PatientContext.Provider value={{ patients, getPatientInfo }}>
            {props.children}
        </PatientContext.Provider>
    );
};

export default PatientStates;
