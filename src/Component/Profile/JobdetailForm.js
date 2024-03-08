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
import Work from "../../layouts/work2";
import { modaljob } from '../../Styles/Jobformstyle'
const JobdetailForm = () => {
    const authdata = useSelector((state) => state.auth.user?.user.user);

    const [Job, setJob] = React.useState(false);
  const handleJobOpen = () => setJob(true);
  const handleJobClose = () => setJob(false);
  const toast = useRef(null);

  const {
    JobDetailsForm, setJobDetailsForm,
    Jobdetails, setJobdetails,
    PreferedRole, setPreferedRole,
    UserRole, setUserrole,
    DBskills, setDBskills,
    JobSkillsarray, setJobSkillsarray,
     selectedFile, setSelectedFile,
  } = Jobusestates();
  const [Jobskills,setJobskills] = useState('');
  const [inputValues, setInputValues] = useState(['']);
  const [JobskillsLevel,setJobskillsLevel] = useState('');
  

  const scroolcss = {
    overflowY:"scroll",
    height:"90vh"
  }

  const edit_jobdetails = async (e, table) => {
    e.preventDefault();
    const fetchDetails = await FetchDetails(authdata?.id, table);
    if(fetchDetails[1]){
        setDBskills(fetchDetails[1]);
    }
    if (fetchDetails) {
      console.log('open model in job details edit form', fetchDetails[1]);
      
      setJobDetailsForm(fetchDetails[0]);
    } else {
      // Handle the case when fetchDetails is null
      console.log('No details found');
      setJobDetailsForm(null);
      setDBskills(null);
    }
  };
  
  
   useEffect(() => {
   const fetchJobdetails = async() => {
    const fetchJobDetails = await FetchDetails(authdata?.id,'JobDetails');
    const skillsArray = (fetchJobDetails && fetchJobDetails[1]) ? fetchJobDetails[1].map(item => item.skills) : [];
    setJobSkillsarray(skillsArray);
    setJobdetails(fetchJobDetails);

    
   }

   fetchJobdetails();
   }, [])
   

  const HandleAddJobDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value; 

    if(action.trim() == 'update'){
      const educationalUpdatedetails = {
        insertdata : JobDetailsForm,
        "table":"JobDetails",
        "insertMessage":"Job Details Updated Successfully"
      }
      const JobDetails = await UpdateDetails(educationalUpdatedetails);
      if(JobDetails){
        setJob(false);
       
        const fetchDetails = await FetchDetails(authdata?.id,'JobDetails');
        if(fetchDetails){
          setJobdetails(fetchDetails);
         }
        toast.current.show({severity:'success', summary: 'Success', detail:JobDetails.data.data.message, life: 3000});
        
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:JobDetails.data.data.message, life: 3000});
    }
    }else{
      const jobdetails = {
        insertdata : JobDetailsForm,
        "table":"JobDetails",
        "insertMessage":"Job Details Inserted Successfully",
        "skills":Jobskills,
         "resume":selectedFile
      }
      const addjobdetailsdata = await AddDetails(jobdetails);
      
      if(addjobdetailsdata){
        setJob(false);
        const fetchDetails = await FetchDetails(authdata?.id,'JobDetails');
        if(fetchDetails){
          setJobdetails(fetchDetails);
        }
        toast.current.show({severity:'success', summary: 'Success', detail:addjobdetailsdata.data.data.message, life: 3000});
      }else{
       console.log(addjobdetailsdata);
    }
    }
    
  }

  const handleJobDetails = (e) => {
    const { name, value } = e.target;
    setJobDetailsForm({
      ...JobDetailsForm,
      [name]: value,
      userid: authdata?.id,
      user_role: UserRole ? UserRole : JobDetailsForm.user_role,
  
      
    });
  };

  const handlemultipleskillChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const handleAddSkill = () => {
    setCommonFields((prev) => {
      const updatedSkills = [...prev.skills, { name: "", level: "" }];
      return { ...prev, skills: updatedSkills };
    });
  };

  const [commonFields, setCommonFields] = useState({
    yearsOfExperience: "",
    currentRole: "",
    skills: Array(1).fill({ name: "", level: "" }),
  });

  const handleRemoveInput = (index) => {
    const updatedValues = [...inputValues];
    updatedValues.splice(index, 1);
    setInputValues(updatedValues);
  };

  const fileInputRef = useRef(null);

  return (
    <div>
     <Toast ref={toast} />
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Job Details</h5>
          <p>
            <Button onClick={(e)=>{handleJobOpen();edit_jobdetails(e,'JobDetails')}}>
            {Jobdetails ? (
           <i className="fi fi-rr-file-edit ms-2"></i>
          ) : (
           <i className="fi fi-rr-layer-plus"></i>
           )}
            </Button>
            <Modal
              open={Job}
              
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modaljob}
              style={scroolcss}
              >
             
                <form onSubmit={HandleAddJobDetails}>
                <div className="">
                  <Work 
                  handleJobDetails={handleJobDetails}
                  handlemultipleskillChange={handlemultipleskillChange}
                  handleAddSkill={handleAddSkill}
                  handleRemoveInput={handleRemoveInput}
                  setJobskills={setJobskills}
                  setJobskillsLevel={setJobskillsLevel}
                  setPreferedRole={setPreferedRole}
                  setJobDetailsForm={setJobDetailsForm}
                  JobDetailsForm={JobDetailsForm}
                  setUserrole={setUserrole}
                  UserRole={UserRole}
                  Jobdetails={Jobdetails}
                  DBskills={DBskills}
              
                  fileInputRef={fileInputRef}
                  setSelectedFile={setSelectedFile}
                
                   />
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-danger me-2"
                      onClick={handleJobClose}
                    >
                      Cancel
                    </button>

                    {
                      Jobdetails ? (
                  <button type="submit" value='update' className="btn btn-primary">Update</button>
                ) : (
                  <button type="submit" value='add'  className="btn btn-primary">Submit</button>
                )
              }
                  
                  </div>
                </div>
                </form>
               
              </Box>
            </Modal>
          </p>
        </div>

       {
        Jobdetails && (
          <>
          <div className="d-flex justify-content-between">
          <p>
            Are you a working Professional or Fresher : <span>{Jobdetails[0]?.user_role}</span>
          </p>
          <p>
            Resume : <span>{Jobdetails[0]?.resume}</span>
          </p>
        </div>

        <div className="row">
          <div className="col-md-4">
            <p>
              Designation : <span> {Jobdetails[0]?.current_job}</span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              Years : <span>{`${Jobdetails[0]?.work_experiance} years`}</span>
            </p>
          </div>
        </div>
        <p>
          Skills : <span>{JobSkillsarray.join(', ')}</span>
        </p>
        <p>
          Previous Company : <span> {Jobdetails[0]?.previous_company}</span>
        </p>
          </>
        )
       }
        




      
      
      </div>
    </div>
  )
}

export default JobdetailForm
