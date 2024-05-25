import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./containers/Login";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./containers/Dashboard/Dashboard";
import Staff from "./containers/Staff";
import Patients from "./containers/Patients/Patients";
import PatientPrescriptionList from "./components/PatientPrescriptionList";
import OutPatient from "./containers/OutPatient";
import ActivateAccount from "./containers/ActivateAccount";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import RequireAppAuth from "./components/RequireAppAuth";
import RequireRoleAuth from "./components/RequireRoleAuth";
import { userRoles } from "./config/userRoles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="activate-account/:token" element={<ActivateAccount />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route element={<RequireAppAuth />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route element={<RequireAppAuth />}>
            <Route element={<RequireRoleAuth allowedRoles={[Number(userRoles.admin)]} />}>
              <Route path="staffs" element={<Staff />} />
            </Route>
            <Route path="patients" element={<Patients />} />
            <Route
              path="patients-history/:id"
              element={<PatientPrescriptionList />}
            />
            <Route path="out-patient" element={<OutPatient />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
