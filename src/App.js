
import './App.css';
import Navbar from "./Component/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import AdminHome from "./Component/AdminHome";
import PatientStates from "./Context/PatientStates";
import Home from "./Component/Home";
import AddPatient from "./Component/AddPatient";
import FetchInfo from "./Component/FetchInfo";
import UpdatePatient from "./Component/UpdatePatient";

function App() {
  return (
    <>
      <PatientStates>
        <Router>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/adminhome" element={<AdminHome/>}/>
              <Route path="/addpatient" element={<AddPatient/>}/>
              <Route path="/fetchinfo" element={<FetchInfo/>}/>
              <Route path="/updatepatient" element={<UpdatePatient/>}/>

            </Routes>
          </div>

        </Router>

      </PatientStates>

    </>
  );
}

export default App;
