import { Routes, Route } from "react-router-dom";
import './App.scss';
import Login from "./containers/Login";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./containers/Dashboard/Dashboard";
import Staff from "./containers/Staff"
import Patients from "./containers/Patients/Patients";
import PatientPrescriptionList from "./components/PatientPrescriptionList"
import OutPatient from "./containers/OutPatient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="dashboard" element={<DashboardLayout/>}>
        <Route path="" element={<Dashboard/>}/>
        <Route path="staffs" element={<Staff/>}/>
        <Route path="patients" element={<Patients/>}/>
        <Route path="patients-history/:id" element={<PatientPrescriptionList/>}/>
        <Route path="out-patient" element={<OutPatient/>}/>
      </Route>
    </Routes>
  );
}

export default App;
