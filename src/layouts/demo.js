import React, { useState } from "react";
// import SelectOptionsExample from "./occupation";
import "./demo.css";
import VehicleSaleForm from "./vehiclesale";
import FamilyForm from "./familydetails";
import ContactForm from "./contactdetails";
import EmailForm from "./emailid";
import ReligionForm from "./religion";
// import DisabilityForm from "./disability";
import DisabilityForm1 from "./disability";
import IdProofForm from "./idproof";
import GadgetSaleForm from "./gadget";
import HomeApplianceSaleForm from "./homeappiance";
// import UserProfile from "./profile";
// import EducationDetails from "./educationdetails";
// import Workexperience  from './workexperience';
import PropertyRentForm from "./property";
import AddressForm from "./address";
import Work from "./work2";

const Demo = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    middleName: "",
    lastName: "",
    dob: "",
    age: "",
    mobileNumber: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    postcode: "",
    state: "",
    area: "",
    email: "",
    education: "",
    country: "",
    stateRegion: "",
    experience: "",
    additionalDetails: "",
    profilePicture: "default.jpg",
  });

  const [selectedNationality, setSelectedNationality] = useState("");
  const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguans",
    "Argentinean",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djibouti",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Herzegovinian",
    "Honduran",
    "Hungarian",
    "I-Kiribati",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kittian and Nevisian",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivan",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealander",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Northern Irish",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamer",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian/Tobagonian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemenite",
    "Zambian",
    "Zimbabwean",
  ];

  const handleNationalityChange = (event) => {
    setSelectedNationality(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
    alert("Profile saved successfully!");
  };

  const handleGenderClick = (selectedGender) => {
    setProfileData((prevData) => ({ ...prevData, gender: selectedGender }));
  };

  return (
    <div className="container card">
      <div className="rounded bg-white my-4">
        <h2>Form</h2>
        <div className="row">
          {/* <div className="col-12 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">User Profile</h4>
              </div>
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="Profile"
              />
              <span className="font-weight-bold">Sample</span>
              <span className="text-black-50">sample@mail.com.y</span>
            </div>
          </div> */}
          {/* <UserProfile /> */}
          <div className="col-12 border-right fst-demo">
            <div>
              <div className="row my-4">
                <div className="col-md-4 col-12">
                  <label className="labels dmo_name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={profileData.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <label className="labels dmo_name">Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Middle Name"
                    value={profileData.middleName}
                    onChange={handleChange}
                    name="middleName"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <label className="labels dmo_name">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={profileData.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
                </div>
              </div>

              <div className="row my-4">
                <div className="col-md-3 dmo_flex pb-2">
                  <label className="labels">DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date of birth"
                    value={profileData.dob}
                    onChange={handleChange}
                    name="dob"
                  />
                </div>

                <div className="col-md-3 dmo_flex pb-2">
                  <label className="labels">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Time"
                    value={profileData.time}
                    onChange={handleChange}
                    name="time"
                  />
                </div>
                <div className="col-md-3 dmo_flex pb-2">
                  <label className="labels">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Age"
                    // value={profileData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row my-4 align-items-center">
                <div className="col-12 col-md-1">
                  <label className="labels">Gender:</label>
                </div>
                <div className="col-12 col-md-1 form-check p-2">
                  <button
                    type="button"
                    className={`btn btn-outline-primary ${
                      profileData.gender === "Male" && "active"
                    }`}
                    onClick={() => handleGenderClick("Male")}
                  >
                    Male
                  </button>
                </div>
                <div className="col-12 col-md-1 form-check p-2">
                  <button
                    type="button"
                    className={`btn btn-outline-primary ${
                      profileData.gender === "Female" && "active"
                    }`}
                    onClick={() => handleGenderClick("Female")}
                  >
                    Female
                  </button>
                </div>
                <div className="form-check col-12 col-md-1 p-2">
                  <button
                    type="button"
                    className={`btn btn-outline-primary ${
                      profileData.gender === "Transgender" && "active"
                    }`}
                    onClick={() => handleGenderClick("Transgender")}
                  >
                    Transgender
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-3">
                  <label className="labels col-12 pb-3" htmlFor="nationality">
                    {" "}
                    Nationality:
                  </label>
                  <select
                    className="form-select"
                    id="nationality"
                    name="nationality"
                    value={selectedNationality}
                    onChange={handleNationalityChange}
                  >
                    <option value="">Select a Nationality</option>
                    {nationalities.map((nationality, index) => (
                      <option key={index} value={nationality}>
                        {nationality}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {selectedNationality && (
  <p>You selected: {selectedNationality}</p>
)} */}
              </div>
              <AddressForm />
              <ContactForm handleChange={handleChange} />
              <EmailForm />
              <FamilyForm />
              <ReligionForm />
              <DisabilityForm1 />
              <IdProofForm />
              {/* <Workexperience/>    */}
              <Work />
              {/* <EducationDetails/>     */}
              {/* <SelectOptionsExample /> */}
              <VehicleSaleForm />
              <HomeApplianceSaleForm />
              <GadgetSaleForm />
              <PropertyRentForm />
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
