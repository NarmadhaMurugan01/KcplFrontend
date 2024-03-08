// ContactFormState.js

import { useState } from "react";

const Jobusestates = () => {
  const [ContactForm, setContactForm] = useState({
    userid: "",
    plotnumber: "99367763563",
    Street: "",
    place: "",
    taluk: "",
    district: "",
    zipcode: "",
    idproof: "",
    idnumber: "",
    issueDate: "",
    country: "",
    IssuingAuthority: "",
    plotname: "",
    plotnumber: "",
  });

  const [PersonalDetailsForm, setPersonalDetailsForm] = useState({
    userid: "",
    dob: "",
    age: "",
    gender: "",
    material_status: "",
    occupation: "",
    disability: "",
    description: "",
    relation_name: "",
    relation_dob: "",
    relation_age: "",
    relation: "",
  });

  const [EducationalDetailsForm, setEducationalDetailsForm] = useState({
    userid: "",
    clg_course: "",
    clg_specialization: "",
    start_year: "",
    end_year: "",
    university: "",
    collage: "",
    scl_qualification: "",
    scl_specialization: "",
    scl_start: "",
    scl_end: "",
    scl_name: "",
    scl_percentage:"",
    clg_percentage:""
  });




  const [JobDetailsForm, setJobDetailsForm] = useState({
    userid: "",
    user_role:"",
    work_experiance: "",
    current_role: "",
   
    current_job: "",
    current_company: "",
    previous_company: "",
    industry: "",
    
    currently_located:"",
    open_to_work:"",
    salary_expectation:"",
    notice_period:"",

    prefered_job:"",
    prefered_role:"",

    start_career_month:"",
    start_career_year:"",
    reason_career_break:"",

   
  });


  const [personaldetails, setPersonaldetails] = useState("");
  const [Jobdetails, setJobdetails] = useState("");
  const [EducationalDetails, setEducationalDetails] = useState("");
  const [HomeApplianceDetails, setHomeApplianceDetails] = useState("");
  const [personalformGender, setPersonalformGender] = useState("");
  const [ErrorValidYear, setValidYear] = useState('');
  const [PreferedRole, setPreferedRole] = useState('');
  const [UserRole, setUserrole] = useState('');
  const [FormType, setFormType] = useState('save');
  const [resumedata, setResumedata] = useState('');
  const [UpdateButton, setUpdateButton] = useState('Add');
  const [VehicleUpdateButton, setVehicleUpdateButton] = useState('Add');
  const [GadgetUpdateButton, setGadgetUpdateButton] = useState('Add');
  const [PropertyUpdateButton, setPropertyUpdateButton] = useState('Add');
  const [VehicleDetails, setVehicleDetails] = useState('');
  const [GadgetDetails, setGadgetDetails] = useState('');
  const [PropertyDetails, setPropertyDetails] = useState('');
  const [GadgetDetailsdata, setGadgetDetailsData] = useState([]);
  const [Gender, setGender] = useState('');
  const [JobSkillsarray, setJobSkillsarray] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState('');


  const [DBskills, setDBskills] = useState({
    yearsOfExperience: "",
    currentRole: "",
    skills: Array(1).fill({ name: "", level: "" }),
  });



  const [HomeApllianceDetailsForm, setHomeApllianceDetailsForm] = useState({
    userid: "",
    Appliance_type: "",
    brand: "",
    model: "",
    start_period: "",
    end_period: "",
    description: "", 
    date_of_purchase:""
  });

  const [EditHomeApllianceDetailsForm, EditsetHomeApllianceDetailsForm] = useState({
    userid: "",
    Appliance_type: "",
    brand: "",
    model: "",
    start_period: "",
    end_period: "",
    description: "", 
    date_of_purchase:""
  });



  const [VehicleDetailsForm, setVehicleDetailsForm] = useState({
    userid: "",
    model: "",
    type: "",
    vehicle_no: "",
    dealer_agency: "",
    description: "",
    vehicle:"",
    brand:""
  });


  const [GadgetDetailsForm, setGadgetDetailsForm] = useState({
    userid: "",
    gadget: "",
    brand: "",
    warranty: "",
    purchase_date: "",
    description: "",
    model:""
  });

  const [PropertyDetailsForm, setPropertyDetailsForm] = useState({
    userid: "",
    property_types: "",
    bhk_type: "",
    property_description: "",
    property_location: "",
    property_status: "",
    land_sqfit:"",
    property_types_option:""
  });

  return {
    ContactForm,
    setContactForm,
    personaldetails,
    setPersonaldetails,
    PersonalDetailsForm,
    setPersonalDetailsForm,
    personalformGender,
    setPersonalformGender,
    EducationalDetails,
    setEducationalDetails,
    EducationalDetailsForm,
     setEducationalDetailsForm,
     ErrorValidYear,
     setValidYear,
     JobDetailsForm, setJobDetailsForm,
     Jobdetails, setJobdetails,
     PreferedRole, setPreferedRole,
     UserRole, setUserrole,
     DBskills, setDBskills,
     resumedata, setResumedata,
     HomeApllianceDetailsForm, setHomeApllianceDetailsForm,
     HomeApplianceDetails, setHomeApplianceDetails,
     UpdateButton, setUpdateButton,
     VehicleDetailsForm, setVehicleDetailsForm,
     VehicleDetails, setVehicleDetails,
     VehicleUpdateButton, setVehicleUpdateButton,

     GadgetDetailsForm, setGadgetDetailsForm,
     GadgetDetails, setGadgetDetails,
     GadgetDetailsdata, setGadgetDetailsData,
     GadgetUpdateButton, setGadgetUpdateButton,

     PropertyUpdateButton, setPropertyUpdateButton,
     PropertyDetailsForm, setPropertyDetailsForm,
     PropertyDetails, setPropertyDetails,
     Gender, setGender,
     EditHomeApllianceDetailsForm, EditsetHomeApllianceDetailsForm,
     JobSkillsarray, setJobSkillsarray,
     selectedFile, setSelectedFile,
     selectedImage1, setSelectedImage1
  };
};

export default Jobusestates;
