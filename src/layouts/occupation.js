import React, { useState } from "react";
import "./demo.css";

const SelectOptionsExample = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedEmployment, setSelectedEmployment] = useState('');
  // Additional state variables for employed details
  // const [employmentType, setEmploymentType] = useState("");
  const [experience, setExperience] = useState("");
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [currency, setCurrency] = useState("Rupees");
  const [skills, setSkills] = useState("");
  const [jobProfile, setJobProfile] = useState("");

  const employmentOptions = [
    "Select an option",
    "Employed",
    "Unemployed",
    "Businessmen / Women",
    "Self Employed",
    "Student",
    "Home maker",
  ];
  const employmentTypes = [
    'Full-Time Employment',
    'Part-Time Employment',
    'Temporary Employment',
    'Contract Employment',
    'Permanent Employment',
    'Freelance or Independent Contractor',
    'Internship',
    'Apprenticeship',
    'Consulting',
    'Seasonal Employment',
    'Remote or Telecommuting',
    'Zero-Hour Contract',
    'Casual Employment',
    'Project-Based Employment',
  ];


  const centralGovtJobs = [
    "Administrative Services",
    "Defense and Security",
    "Railways",
    "Finance and Banking",
    "Healthcare",
    "Education",
    "Foreign Affairs",
    "Public Sector Undertakings (PSUs)",
    "Research and Development",
    "Technology and IT",
    "Law and Justice",
    "Social Services",
    "Environment and Forests",
    "Infrastructure and Urban Development",
    "Agriculture and Rural Development",
    "Transportation",
    "Telecommunications",
    "Energy",
    "Cultural and Heritage",
    "Intelligence Agencies",
  
  ];

  const stateGovtJobs = [
    "Public Service Commission (PSC)",
    "Police Constable",
    "Sub-Inspector",
    "Assistant Superintendent of Police",
    "State Education Department",
    " State Universities and Colleges",
    "State Health Departments",
    "Hospitals and Healthcare Institutions",
    "State Finance Departments",
    " State Treasury Services",
    "State Transport Departments",
    "Road and Transport Corporations",
    "State Public Works Departments",
    "Panchayat Raj Department",
    "Municipal Administration",
    "State Agriculture Departments",
    "Animal Husbandry",
    "State Forest Departments",
    "Environmental Conservation Agencies",
    "Women and Child Development Departments",
    "Social Welfare Programs",
    "Land Revenue Departments",
    "Taxation Departments",
    "Irrigation Departments",
    "Water Supply and Sanitation",
    "State Electricity Boards/Corporations",
    "State Housing Boards",
    "Urban Development Authorities",
    "State IT Departments",
    "State Tourism Departments",
    "Cultural Affairs Departments",
    "State Sports Departments",
    "Youth Welfare Programs",
    "State Judiciary",
    "Legal Services Authorities",
    "State Disaster Management Authorities",
  ];

  
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setSelectedSubOption(""); 
  };
  const handleSubOptionChange = (event) => {
    setSelectedSubOption(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleCurrentDesignationChange = (event) => {
    setCurrentDesignation(event.target.value);
  };

  const handleJoiningDateChange = (event) => {
    setJoiningDate(event.target.value);
  };

  const handleAnnualSalaryChange = (event) => {
    setAnnualSalary(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleJobProfileChange = (event) => {
    setJobProfile(event.target.value);
  };
  const handleEmploymentChange = (event) => {
    setSelectedEmployment(event.target.value);
  };


  return (
      <div className="my-4">
      <div className="row dmo_occupation">
        <div className="labels px-3">Occupation</div>
        <div className="col-12 col-md-2">
          <select
            className="form-control"
            value={selectedOption}
            onChange={handleOptionChange}>
            {employmentOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {selectedOption === "Employed" && (

        <div className="col-12 col-md-3">
          <select
            className="form-control"
            value={selectedSubOption}
            onChange={handleSubOptionChange}
          >
            <option value="">Select Employment Type</option>
            <option value="Central Government">Central Government</option>
            <option value="State Government">State Government</option>
          </select>
        </div>
        )}

        {(selectedSubOption === "Central Government") && (
        <div className="col-12 col-md-3">
          <select className="form-control">
         {centralGovtJobs.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        )}

        {(selectedSubOption === "State Government") && (
          <div className="col-12 col-md-3">
            <select className="form-control">
              {stateGovtJobs.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        )}

        {(selectedOption === "Employed") && (
          <div className="row my-4">
               <div className="col-12 col-md-3">
              <label>Company / Institute Name:</label>
              <input
                className="form-control"
                type="text"
                value={companyName}
                onChange={handleCompanyNameChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Employment Type:</label>

      <select className="form-control"
        id="employmentDropdown" 
        value={selectedEmployment}
        onChange={handleEmploymentChange}
      >
        <option value="">Select an Type</option>
        {employmentTypes.map((employmentType, index) => (
          <option key={index} value={employmentType}>
            {employmentType}
          </option>
        ))}
      </select>
            </div>
            <div className="col-12 col-md-3">
              <label>Experience:</label>
              <input
                className="form-control"
                type="text"
                value={experience}
                onChange={handleExperienceChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Current Designation:</label>
              <input
                className="form-control"
                type="text"
                value={currentDesignation}
                onChange={handleCurrentDesignationChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Joining Date:</label>
              <input
                className="form-control"
                type="text"
                value={joiningDate}
                onChange={handleJoiningDateChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Total Annual Salary:</label>
              <div className="input-group">
                <select
                  className="form-control"
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  <option value="Rupees">&#x20B9;</option>
                  <option value="Dollars">&#x0024;</option>
                </select>
                <input
                  className="form-control"
                  type="text"
                  value={annualSalary}
                  onChange={handleAnnualSalaryChange}
                />

              </div>
            </div>
            <div className="col-12 col-md-3">
              <label>Skills:</label>
              <input
                className="form-control"
                type="text"
                value={skills}
                onChange={handleSkillsChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Job Profile:</label>
              <input
                className="form-control"
                type="text"
                value={jobProfile}
                onChange={handleJobProfileChange}
              />
            </div>
          </div>
        )}

        {(selectedOption === "Unemployed" ||
          selectedOption === "Student" ||
          selectedOption === "Self Employed" ||
          selectedOption === "Businessmen / Women") && (
          <div className="row my-4">
            <div className="col-12 col-md-3">
              <label>Company / Institute Name:</label>
              <input
                className="form-control"
                type="text"
                value={companyName}
                onChange={handleCompanyNameChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Email:</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label>Phone Number:</label>
              <input
                className="form-control"
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default SelectOptionsExample;
