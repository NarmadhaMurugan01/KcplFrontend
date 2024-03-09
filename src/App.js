import "./App.css";
import Main from "./Component/Main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Job from "./layouts/Job";
import Vehicle from "./layouts/Vehicle";
import Login from "./auth/Login";
import Demo from "./layouts/demo";
import Register from "./auth/Register";
import MyForm from "./utils/form";
import { useRef } from "react";
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import DynamicInputFields from "./utils/appenform";
import PropertyDetailFormPage from "./Component/Profile/PropertyDetailForm";
import About from "./layouts/About";
import ContactUs from "./layouts/ContactUs";
import TermsPolicy from "./layouts/TermsPolicy";
import Maintainence from "./layouts/Maintainence";
import ResetPassword from '../src/auth/ResetPassword'

function App() {
  const toast = useRef(null);

  return (
    <div className="App">
     
      <Router>
        <Routes>
        <Route path="/" element={<Maintainence />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ap" element={<DynamicInputFields />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/main" element={<Main />}>
          <Route index element={<Maintainence />} />
            <Route path="/main/jobs" element={<Job />} />
            <Route path="/main/ContactUs" element={<ContactUs />} />
            <Route path="/main/About" element={<About />} />
            <Route path="/main/Terms" element={<TermsPolicy />} />
            <Route path="/main/vehicle" element={<Vehicle />} />
            <Route path="/main/demo" element={<Demo />} />
            <Route path="/main/form" element={<MyForm />} />
            <Route path="/main/form1" element={<PropertyDetailFormPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
