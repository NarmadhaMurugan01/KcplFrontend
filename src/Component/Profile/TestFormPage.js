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
import CollageForm from "../AddEducationDetails/CollageForm";
import SchoolForm from "../AddEducationDetails/SchoolForm";

const TestFormPage = () => {
  const authdata = useSelector((state) => state.auth.user?.user);

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
          <h5>Education Details</h5>
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
                  width:"95%"
                }}
              >
               
                  <div> 
                  <h2>School Details</h2>
                  <SchoolForm />
                  </div>

                  <div style={{
                    marginTop:"30px"
                  }}> 
                  <h2>Collage Details</h2>
                  <CollageForm />
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

export default TestFormPage;
