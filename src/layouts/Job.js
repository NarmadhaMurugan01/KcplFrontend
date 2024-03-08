import React, { useState, useMemo } from "react";
import "./job.css";
import bird from "../assets/images/bird_2.jpg";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Nodeapi, ProfileImgApi } from "../config/serverUrl";
import axios from "axios";
import { Toast } from "primereact/toast";
import Jobusestates from "../useStates/JobUsestate";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import ContactInformationForm from "../Component/Profile/ContactInformation";
import PersonalDetailsForm1 from "../Component/Profile/PersonalDetails";
import EducationForm from "../Component/Profile/EducationForm";
import JobdetailForm from "../Component/Profile/JobdetailForm";
import HomeApplianceFormPage from "../Component/Profile/HomeApplianceForm";
import VehicleDetailsFormPage from "../Component/Profile/VehicleDetailsForm";
import GadgetDetailsFormPage from "../Component/Profile/GadgetDetailsForm";
import PropertyDetailFormPage from "../Component/Profile/PropertyDetailForm";
import {style} from '../Styles/Jobformstyle';


function Job() {
  const authdata = useSelector((state) => state.auth.user?.user);
  const token = useSelector((state) => state.auth.user?.user.token);
  console.log("redux state", authdata);
  console.log("token", token);
  const { selectedImage1, setSelectedImage1 } = Jobusestates();
  const fileInputRef = useRef(null);

  const toast = useRef(null);

  const [Name, setName] = React.useState(false);
  const handleNameOpen = () => setName(true);
  const handleNameClose = () => setName(false);


  

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileFileChange = async (e) => {
    const selectedFile = e.target.files[0];
   console.log(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage1(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
    const imgData = {
      id: authdata?.id,
      profile_image: selectedFile,
    };
    const res = await axios.post(`${Nodeapi}/upload_profile_img`, imgData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    if (res.data) {
      if (res.data.code == 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: res.data.data.message,
          life: 3000,
        });
        setSelectedImage1(res.data.data.image);
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: res.data.data.message,
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="job" style={{height:"93vh"}}>
        <div className="card mt-4" style={{ position: "relative" }}>
          <div className="profile">
            <div
              style={{
                position: "relative",
                textAlign: "center",
                height: "25vh",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="pro-img-container"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    src={
                      selectedImage1
                        ? `${ProfileImgApi}${selectedImage1}`
                        : `${ProfileImgApi}/${authdata?.profile_image}` || bird
                    }
                    alt="Selected Image"
                    className="img-fluid"
                    style={{
                      height: "107px",
                      width: "110px",
                      borderRadius: "50%",
                      boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.09)",
                    }}
                    onClick={handleImageClick}
                  />
                  <div
                    className="camera-icon"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      margin: "10px",
                    }}
                    onClick={handleImageClick}
                  >
                    <FaCamera
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleProfileFileChange}
                    />
                  </div>
                </div>

                <h5 className=" text-center mt-2">
                  {authdata ? authdata.name : "Profile"}
                  <sup>
                   
                    <Modal
                      open={Name}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <p>NAme</p>
                        <button onClick={handleNameClose}>Close</button>
                      </Box>
                    </Modal>
                  </sup>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ContactInformationForm />
        </div>

        <div>
          <PersonalDetailsForm1 />
        </div>

        <div>
          <EducationForm />
        </div>

        <div>
          <JobdetailForm />
        </div>

        <div>
          <HomeApplianceFormPage />
        </div>

        <div>
          <VehicleDetailsFormPage />
        </div>

        <div>
          <GadgetDetailsFormPage />
        </div>

        <div>
          <PropertyDetailFormPage />
        </div>
      </div>
    </>
  );
}

export default Job;
