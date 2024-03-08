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
import { style } from '../../Styles/Jobformstyle'



const PersonalDetailsForm1 = () => {
    const authdata = useSelector((state) => state.auth.user?.user.user);
  const toast = useRef(null);

 

  const [personal, setpersonal] = useState(false);
  const handlePersonalOpen = () => setpersonal(true);
  const handlePersonalClose = () => setpersonal(false);
  const {
    personaldetails,
    setPersonaldetails,
    PersonalDetailsForm,
    setPersonalDetailsForm,
  } = Jobusestates();

  useEffect(() => {
    const fetchPersonalInformation = async () => {
        const fetchPersonalDetails = await FetchDetails(authdata?.id,'PersonalDetails');
        if(fetchPersonalDetails){
          setPersonaldetails(fetchPersonalDetails);
        }
    };

    fetchPersonalInformation();
  }, []);

  const addEditValues = async (e, table) => {
    e.preventDefault();
    const fetchPersonalDetails = await FetchDetails(authdata?.id, table);
    if (fetchPersonalDetails) {
      setPersonalDetailsForm(fetchPersonalDetails);
    } else {
      setPersonalDetailsForm(null);
    }
  };

  const handlePersonalDetails = (e, gender) => {
    // Set the gender using the selectedGender parameter
    const { name, value } = e.target;
    const updatedForm = {
      ...PersonalDetailsForm,
      [name]: value,
      userid: authdata?.id,
      gender: gender, // Use the parameter 'gender', not 'Gender'
    };
    const cleanedForm = removeEmptyStrings(updatedForm);
    setPersonalDetailsForm(cleanedForm);
  };

  function removeEmptyStrings(obj) {
    const cleanedObject = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (value !== "") {
        cleanedObject[key] = value;
      }
    });

    return cleanedObject;
  }

  const HandleAddPersonalDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value;

    if (action.trim() == "update") {
      const personalUpdatedetails = {
        insertdata: PersonalDetailsForm,
        table: "PersonalDetails",
        insertMessage: "Personal Details Updated Successfully",
      };
      const updateDetails = await UpdateDetails(personalUpdatedetails);

      if (updateDetails) {
        setpersonal(false);
        setPersonaldetails(updateDetails.data.data.response[0]);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: updateDetails.data.data.message,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: updateDetails.data.data.message,
          life: 3000,
        });
      }
    } else {
      const personaldetails = {
        insertdata: PersonalDetailsForm,
        table: "PersonalDetails",
        insertMessage: "Personal Details Inserted Successfully",
      };
      const addPersonaldetailsdata = await AddDetails(personaldetails);
      console.log('add details',addPersonaldetailsdata);
      if (addPersonaldetailsdata) {
        setpersonal(false);
        setPersonaldetails(addPersonaldetailsdata.data.data.response);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: addPersonaldetailsdata.data.data.message,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: addPersonaldetailsdata,
          life: 3000,
        });
      }
    }
  };
  return (
    <div>
      <Toast ref={toast} />
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Personal Details</h5>
          <p>
            <Button
              onClick={(e) => {
                handlePersonalOpen();
                addEditValues(e, "PersonalDetails");
              }}
            >
              {personaldetails ? (
                <i className="fi fi-rr-file-edit ms-2"></i>
              ) : (
                <i className="fi fi-rr-layer-plus"></i>
              )}
            </Button>
            <Modal
              open={personal}
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
                <form onSubmit={HandleAddPersonalDetails}>
                  <div className="row">
                    <div className="col-6 my-2">
                      <label className="labels mb-2 ">DOB</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date of birth"
                        name="dob"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm ? PersonalDetailsForm.dob : ""
                        }
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label className="labels mb-2">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        name="age"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm ? PersonalDetailsForm.age : ""
                        }
                      />
                    </div>
                    <div className="col-7 my-2">
                      <label className="labels mb-2">Gender:</label>
                      <div className="flex">
                        <button
                          type="button"
                          className={`btn btn-outline-primary ${
                            PersonalDetailsForm?.gender === "Male" && "active"
                          }`}
                          onClick={(e) => handlePersonalDetails(e, "Male")}
                        >
                          Male
                        </button>
                        <button
                          type="button"
                          className={`btn btn-outline-primary mx-3 ${
                            PersonalDetailsForm?.gender === "Female" && "active"
                          }`}
                          onClick={(e) => handlePersonalDetails(e, "Female")}
                        >
                          Female
                        </button>
                        <button
                          type="button"
                          className={`btn btn-outline-primary ${
                            PersonalDetailsForm?.gender === "Transgender" &&
                            "active"
                          }`}
                          onClick={(e) =>
                            handlePersonalDetails(e, "Transgender")
                          }
                        >
                          Transgender
                        </button>
                      </div>
                    </div>
                    <div className="col-5 my-2">
                      <label className="mb-1" htmlFor="mb-2">
                        Marital status
                      </label>
                      <select
                        className="form-control mt-2"
                        id="countryDropdown"
                        name="material_status"
                        onChange={handlePersonalDetails}
                      >
                        <option value="">Select Country</option>
                        <option
                          selected={
                            personaldetails &&
                            personaldetails.material_status === "Single"
                          }
                          value="Single"
                        >
                          Single
                        </option>
                        <option
                          selected={
                            personaldetails &&
                            personaldetails.material_status === "Married"
                          }
                          value="Married"
                        >
                          Married
                        </option>
                      </select>
                    </div>
                    <div className="col-6 my-2">
                      <label className="labels mb-2">Occupation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Occupation"
                        name="occupation"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm
                            ? PersonalDetailsForm.occupation
                            : ""
                        }
                      />
                    </div>
                    <h6 className="mt-2">Disability Details :</h6>
                    <div className="col-6 my-2">
                      <label htmlFor="">Disability</label>
                      <div className="d-flex my-2">
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            name="disability"
                            id=""
                            value="true"
                            onChange={handlePersonalDetails}
                            checked={
                              PersonalDetailsForm?.disability === "true" ||
                              PersonalDetailsForm?.disability === true
                            }
                          />
                          <label htmlFor="" className="ms-1">
                            Yes
                          </label>
                        </div>
                        <div className="d-flex align-items-center ms-3">
                          <input
                            type="radio"
                            name="disability"
                            id=""
                            value="false"
                            onChange={handlePersonalDetails}
                            checked={
                              PersonalDetailsForm?.disability === "false" ||
                              PersonalDetailsForm?.disability === false
                            }
                          />

                          <label htmlFor="" className="ms-1">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 my-2">
                      <label className="labels mb-2">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        name="description"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm
                            ? PersonalDetailsForm.description
                            : ""
                        }
                      />
                    </div>
                    <h6 htmlFor="">Relationship Details :</h6>
                    <div className="col-6 my-2">
                      <label htmlFor="" className="mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="relation_name"
                        className="form-control"
                        placeholder="Name"
                        id="relation_name"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm
                            ? PersonalDetailsForm.relation_name
                            : ""
                        }
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="" className="mb-1">
                        Dob
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date of birth"
                        name="relation_dob"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm
                            ? PersonalDetailsForm.relation_dob
                            : ""
                        }
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="" className="mb-1">
                        Relation
                      </label>
                      <input
                        type="text"
                        name="relation"
                        className="form-control"
                        placeholder="Relation"
                        id="relation"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm
                            ? PersonalDetailsForm.relation
                            : ""
                        }
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label htmlFor="" className="mb-1">
                        Age
                      </label>
                      <input
                        type="text"
                        name="relation_age"
                        className="form-control"
                        placeholder="Age"
                        id="relation_age"
                        onChange={handlePersonalDetails}
                        value={
                          PersonalDetailsForm
                            ? PersonalDetailsForm.relation_age
                            : ""
                        }
                      />
                    </div>
                    <div className="text-center mt-2">
                      <button
                        className="btn btn-danger me-2"
                        onClick={handlePersonalClose}
                      >
                        Cancel
                      </button>
                      {personaldetails ? (
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
                  </div>
                </form>
              </Box>
            </Modal>
          </p>
        </div>
       {
        personaldetails && authdata && (
        <>
        <div className="expand">
          <div className="row">
            <div className="col-md-2">
              <p>
                DOB : <span> {personaldetails ? personaldetails.dob : ""}</span>
              </p>
            </div>
            <div className="col-md-2">
              <p>
                Age : <span> {personaldetails ? personaldetails.age : ""}</span>
              </p>
            </div>
            <div className="col-md-2">
              <p>
                Gender :{" "}
                <span> {personaldetails ? personaldetails.gender : ""}</span>
              </p>
            </div>
            <div className="col-md-3">
              <p>
                Material Status :{" "}
                <span>
                  {" "}
                  {personaldetails ? personaldetails.material_status : ""}
                </span>
              </p>
            </div>
            <div className="col-md-3">
              <p>
                Occupation :{" "}
                <span>
                  {" "}
                  {personaldetails ? personaldetails.occupation : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
        <h6 className="mt-3">Disability Details</h6>
        <div className="row">
          <div className="col-md-2">
            <p>
              Disability :{" "}
              <span>
                {personaldetails
                  ? personaldetails.occupation == true
                    ? "Yes"
                    : "No"
                  : ""}
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p>
              Description :{" "}
              <span> {personaldetails ? personaldetails.description : ""}</span>
            </p>
          </div>
        </div>
        <h6 className="mt-3">Relationship Details</h6>
        <div className="row">
          <div className="col-md-3">
            <p className="mb-0">
              Name :{" "}
              <span>
                {" "}
                {personaldetails ? personaldetails.relation_name : ""}
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="mb-0">
              Dob :{" "}
              <span>
                {" "}
                {personaldetails ? personaldetails.relation_dob : ""}
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="mb-0">
              Relation :{" "}
              <span> {personaldetails ? personaldetails.relation : ""}</span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="mb-0">
              Age :{" "}
              <span>
                {" "}
                {personaldetails ? personaldetails.relation_age : ""}
              </span>
            </p>
          </div>
        </div>
        </>
        )
       }


       


      </div>
    </div>
  )
}

export default PersonalDetailsForm1
