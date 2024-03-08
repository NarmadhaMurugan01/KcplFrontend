import React, { useState } from "react";
import { useEffect } from "react";
import {
    UpdateDetails,
    AddDetails,
    FetchDetails,
} from "../../routes/profileRoutes";
import Jobusestates from "../../useStates/JobUsestate";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { allDegrees,Specializations,allUniversities,schoolQualificationList,academicDisciplines } from "../../Data/JobJson";
import { style } from '../../Styles/Jobformstyle'

const EducationForm = () => {
  const authdata = useSelector((state) => state.auth.user?.user.user);

  const [Education, setEducation] = React.useState(false);
  const handleEducationOpen = () => setEducation(true);
  const handleEducationClose = () => setEducation(false);

  const {
    EducationalDetails,
    setEducationalDetails,
    EducationalDetailsForm,
    setEducationalDetailsForm,
  } = Jobusestates();

  const [validStartYear, setValidStartYear] = useState("");
  const [validEndYear, setValidEndYear] = useState("");
  const [validSclStart, setValidSclStart] = useState("");
  const [validSclEnd, setValidSclEnd] = useState("");

  const toast = useRef(null);

  const handleEducationalDetails = (e) => {
    const { name, value } = e.target;
    setEducationalDetailsForm({
      ...EducationalDetailsForm,
      [name]: value,
      userid: authdata?.id,
    });

    const isValidYear = /^\d{4}$/.test(value);

    if (name.trim() === "start_year") {
      isValidYear
        ? setValidStartYear("")
        : setValidStartYear("Please enter a valid four-digit year.");
    } else if (name.trim() === "end_year") {
      isValidYear
        ? setValidEndYear("")
        : setValidEndYear("Please enter a valid four-digit year.");
    } else if (name.trim() === "scl_start") {
      isValidYear
        ? setValidSclStart("")
        : setValidSclStart("Please enter a valid four-digit year.");
    } else if (name.trim() === "scl_end") {
      isValidYear
        ? setValidSclEnd("")
        : setValidSclEnd("Please enter a valid four-digit year.");
    }
  };

 

  const educational_edutvalue = async (e,table) => {
    e.preventDefault();
    const fetchDetails = await FetchDetails(authdata?.id,table);
 
      if(fetchDetails){  
        setEducationalDetailsForm(fetchDetails);
      }else{
        setEducationalDetailsForm(null);
      }
  }

  useEffect(() => {
    const fetchEducationalInformation = async () => {
        const fetchEducationalDetails = await FetchDetails(authdata?.id,'EducationalDetails');
      setEducationalDetails(fetchEducationalDetails);
    };

    fetchEducationalInformation();
  }, []);


  const HandleAddEducationDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value; 

    if(action.trim() == 'update'){
      const educationalUpdatedetails = {
        insertdata : EducationalDetailsForm,
        "table":"EducationalDetails",
        "insertMessage":"Educational Details Updated Successfully"
      }
      const EducationalDetails = await UpdateDetails(educationalUpdatedetails);
      if(EducationalDetails){
          setEducation(false);
          setEducationalDetails(EducationalDetails.data.data.response[0]);
          toast.current.show({severity:'success', summary: 'Success', detail:EducationalDetails.data.data.message, life: 3000});
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:EducationalDetails.data.data.message, life: 3000});
    }
    }else{
      const educationaldetails = {
        insertdata : EducationalDetailsForm,
        "table":"EducationalDetails",
        "insertMessage":"Educational Details Inserted Successfully"
      }
      const addEducationaldetailsdata = await AddDetails(educationaldetails);
     
      if(addEducationaldetailsdata){
        setEducation(false);
        setEducationalDetails(addEducationaldetailsdata.data.data.response);
        toast.current.show({severity:'success', summary: 'Success', detail:addEducationaldetailsdata.data.data.message, life: 3000});
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:addEducationaldetailsdata, life: 3000});
    }
    }
    
  }

  const [educationDetails, setEducationDetails] = useState([
    {
      highestQualification: true,
      course: "",
      specialization: "",
      year: "",
      university: "",
    },
  ]);
  return (
    <div>
      <Toast ref={toast} />
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Education</h5>
          <p>
            <Button
              onClick={(e) => {
                handleEducationOpen();
                educational_edutvalue(e, "EducationalDetails");
              }}
            >
              {EducationalDetails ? (
                <i className="fi fi-rr-file-edit ms-2"></i>
              ) : (
                <i className="fi fi-rr-layer-plus"></i>
              )}
            </Button>
            <Modal
              open={Education}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={style}
                style={{
                  overflowY: "scroll",
                  height: "90vh",
                }}
              >
                <form onSubmit={HandleAddEducationDetails}>
                  <div className="row">
                    {educationDetails.map((education, index) => (
                      <div key={index}>
                        {education.highestQualification && (
                          <div>
                            <h5 className="labels mb-2">Education Details:</h5>
                            <div className="row pb-4">
                              <h2 className="labels px-3">College Details:</h2>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Select Course:
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleEducationalDetails}
                                  name="clg_course"
                                  id="clg_course"
                                  value={
                                    EducationalDetailsForm
                                      ? EducationalDetailsForm.clg_course
                                      : ""
                                  } // Make sure to use the value attribute here
                                >
                                  <option value="">Select Degree</option>
                                  {allDegrees.map((degree, index) => (
                                    <option
                                      selected={
                                        EducationalDetailsForm?.clg_course ===
                                        degree
                                      }
                                      key={index}
                                      value={degree}
                                    >
                                      {degree}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Select Specialization:
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleEducationalDetails}
                                  name="clg_specialization"
                                  id="clg_specialization"
                                  value={
                                    EducationalDetailsForm?.clg_specialization
                                  }
                                >
                                  <option value="">
                                    Select Specialization
                                  </option>
                                  {Specializations.map((course, index) => (
                                    <option
                                      selected={
                                        EducationalDetailsForm?.clg_specialization ==
                                        course
                                      }
                                      key={index}
                                      value={course}
                                    >
                                      {course}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Start Year:
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="start year"
                                  name="start_year"
                                  id="start_year"
                                  value={EducationalDetailsForm?.start_year}
                                  onChange={handleEducationalDetails}
                                />
                                {/** Conditionally render the error message */}
                                {validStartYear && (
                                  <p style={{ color: "red", marginTop: "5px" }}>
                                    {validStartYear}
                                  </p>
                                )}
                              </div>

                              <div className="col-6 my-2">
                                <label className="form-label">End Year:</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="end year"
                                  name="end_year"
                                  id="end_year"
                                  value={EducationalDetailsForm?.end_year}
                                  onChange={handleEducationalDetails}
                                />

                                {validEndYear && (
                                  <p style={{ color: "red", marginTop: "5px" }}>
                                    {validEndYear}
                                  </p>
                                )}
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Select University:
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleEducationalDetails}
                                  name="university"
                                  id="university"
                                  value={EducationalDetailsForm?.university}
                                >
                                  <option value="">Select University</option>
                                  {allUniversities.map((university, index) => (
                                    <option
                                      selected={
                                        EducationalDetailsForm?.university ==
                                        university
                                      }
                                      key={index}
                                      value={university}
                                    >
                                      {university}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Enter College Name:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="collage"
                                  id="collage"
                                  value={EducationalDetailsForm?.collage}
                                  onChange={handleEducationalDetails}
                                />
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Enter Collage Percentage:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="scl_percentage"
                                  id="scl_percentage"
                                  value={EducationalDetailsForm?.scl_percentage}
                                  onChange={handleEducationalDetails}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <h5 className="labels">School Details:</h5>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Qualification:
                                </label>
                                <select
                                  className="form-select"
                                  name="scl_qualification"
                                  id="scl_qualification"
                                  onChange={handleEducationalDetails}
                                  value={
                                    EducationalDetailsForm?.scl_qualification
                                  }
                                >
                                  <option value="">
                                    Select School Qualification
                                  </option>
                                  {schoolQualificationList.map(
                                    (qualification, index) => (
                                      <option
                                        selected={
                                          EducationalDetailsForm?.scl_qualification ==
                                          qualification
                                        }
                                        key={index}
                                        value={qualification}
                                      >
                                        {qualification}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Specialization:
                                </label>
                                <select
                                  className="form-select"
                                  name="scl_specialization"
                                  id="scl_specialization"
                                  onChange={handleEducationalDetails}
                                  value={
                                    EducationalDetailsForm?.scl_specialization
                                  }
                                >
                                  <option value="">
                                    Select Specialization
                                  </option>
                                  {academicDisciplines.map(
                                    (discipline, index) => (
                                      <option
                                        selected={
                                          EducationalDetailsForm?.scl_specialization ==
                                          discipline
                                        }
                                        key={index}
                                        value={discipline}
                                      >
                                        {discipline}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Start Year:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Start Year"
                                  name="scl_start"
                                  id="scl_start"
                                  value={EducationalDetailsForm?.scl_start}
                                  onChange={handleEducationalDetails}
                                />
                                {validSclStart && (
                                  <p style={{ color: "red", marginTop: "5px" }}>
                                    {validSclStart}
                                  </p>
                                )}
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">End Year:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter End Year"
                                  name="scl_end"
                                  id="scl_end"
                                  value={EducationalDetailsForm?.scl_end}
                                  onChange={handleEducationalDetails}
                                />
                                {validSclEnd && (
                                  <p style={{ color: "red", marginTop: "5px" }}>
                                    {validSclEnd}
                                  </p>
                                )}
                              </div>
                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Enter School Name:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="scl_name"
                                  id="scl_name"
                                  value={EducationalDetailsForm?.scl_name}
                                  onChange={handleEducationalDetails}
                                />
                              </div>

                              <div className="col-6 my-2">
                                <label className="form-label">
                                  Enter School Percentage:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="scl_percentage"
                                  id="scl_percentage"
                                  value={EducationalDetailsForm?.scl_percentage}
                                  onChange={handleEducationalDetails}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      class="btn btn-danger me-2"
                      onClick={() => setEducation(false)}
                    >
                      Cancel
                    </button>

                    {EducationalDetails ? (
                      <button
                        type="submit"
                        value="update"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="submit"
                        value="add"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </Box>
            </Modal>
          </p>
        </div>
        <div className="row">
          {EducationalDetails && (
            <div className="col-md-6">
              <p>
                School -
                <span>
                  {EducationalDetails ? EducationalDetails.scl_name : ""}
                </span>
              </p>
              <p>
                {EducationalDetails ? EducationalDetails.scl_qualification : ""}{" "}
                -{" "}
                <span>
                  {" "}
                  {EducationalDetails
                    ? `${EducationalDetails.scl_percentage}`
                    : ""}
                </span>
              </p>
              <p>
                <span>
                  {EducationalDetails
                    ? `${EducationalDetails.scl_start} - ${EducationalDetails.scl_end}`
                    : ""}
                </span>
              </p>
            </div>
          )}

          {EducationalDetails && (
            <div className="col-md-6">
              <p>
                Collage -<span>{EducationalDetails.collage}</span>
              </p>
              <p>
                {EducationalDetails.clg_specialization} -{" "}
                <span> {EducationalDetails.clg_percentage}</span>
              </p>
              <p>
                <span>{`${EducationalDetails.start_year} - ${EducationalDetails.end_year}`}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
