import React, { useState } from "react";
import { useEffect } from "react";
import {
  ContactInformation,
  UpdateContactForm,
  AddContactForm,
} from "../../routes/profileRoutes";
import Jobusestates from "../../useStates/JobUsestate";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { style } from '../../Styles/Jobformstyle'



const ContactInformationForm = () => {
  const { ContactForm, setContactForm } = Jobusestates();
  const toast = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const authdata = useSelector((state) => state.auth.user?.user.user);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchContactInformation = async () => {
      const contact = await ContactInformation(authdata?.id);
      if (contact) {
        setData(contact);
      }
    };

    fetchContactInformation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...ContactForm,
      [name]: value,
      userid: authdata?.id,
    });
  };

  const addContactValue = async (e) => {
    e.preventDefault();
    const contact = await ContactInformation(authdata?.id);
    if (contact) {
      setContactForm(contact);
    } else {
      setContactForm(null);
    }
  };

  const areAllFieldsEmpty = (formData) => {
    if (!formData || typeof formData !== "object") {
      return true;
    }
    return Object.values(formData).every(
      (value) =>
        value === null || value === undefined || String(value).trim() === ""
    );
  };

  const isFormDataEmpty = areAllFieldsEmpty(ContactForm);

  const handleContactForm = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value;

    if (action.trim() == "update") {
      const addcontact = await UpdateContactForm(ContactForm);

      if (addcontact) {
        setOpen(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: addcontact.data.data.message,
          life: 3000,
        });
        setData(addcontact.data.data.response[0]);
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: addcontact.data.data.message,
          life: 3000,
        });
      }
    } else {
      const addcontact = await AddContactForm(ContactForm);

      setOpen(false);
      // toast.current.show({
      //   severity: "success",
      //   summary: "Success",
      //   detail: addcontact.data.data.message,
      //   life: 3000,
      // });
      console.log(addcontact);
      setData(addcontact.data.data.response[0]);
    }
  };

  return (
  <>
  <Toast ref={toast} />
    <div className="card mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Contact Information</h5>
        <p>
          <Button
            onClick={(e) => {
              handleOpen();
              addContactValue(e);
            }}
          >
            {data.userid ? (
              <i className="fi fi-rr-file-edit ms-2"></i>
            ) : (
              <i className="fi fi-rr-layer-plus"></i>
            )}
          </Button>
        </p>

        <Modal
          open={open}
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
            <form onSubmit={handleContactForm}>
              <div className="row">
                <div className="col-6 my-2">
                  <label className="mb-1" htmlFor="">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Enter your mobile no"
                    name="phoneNumber1"
                    value="99367763563"
                    readOnly
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-6"></div>
                <label className="mt-3">Address</label>
                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control col-12 col-md-3"
                    placeholder="Plot Number/Door Number"
                    name="plotnumber"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.plotnumber : ""}
                  />
                </div>

                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control col-12 col-md-3"
                    placeholder="Plot Name/House Name"
                    name="plotname"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.plotname : ""}
                  />
                </div>
                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control col-12 col-md-3"
                    placeholder="Street"
                    name="Street"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.Street : ""}
                  />
                </div>
                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Place/Village"
                    name="place"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.place : ""}
                  />
                </div>
                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Taluk"
                    name="taluk"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.taluk : ""}
                  />
                </div>
                <div className="col-6 my-2">
                  <select
                    className="header_company form-control"
                    name="district"
                    id="district"
                    onChange={handleInputChange}
                  >
                    <option value="">Select District</option>
                    <option value="kanchepuram">kanchepuram</option>
                    <option value="chengalpattu">chengalpattu</option>
                    <option value="tirunelveli">tirunelveli</option>
                  </select>
                </div>
                <div className="col-6 my-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Zip Code"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.zipcode : ""}
                    name="zipcode"
                  />
                </div>
                <div className="col-6 my-2"></div>
                {/* <label className="mt-3">Id Proof</label> */}
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="idNumber">
                    ID Prof:
                  </label>
                  <select
                    id="idproof"
                    className="form-select col-md-4 form-control"
                    onChange={handleInputChange}
                    name="idproof"
                  >
                    <option value="">Select ID Proof</option>
                    <option
                      selected={data && data.idproof === "passport"}
                      value="passport"
                    >
                      Passport
                    </option>
                    <option
                      selected={data && data.idproof === "drivingLicense"}
                      value="drivingLicense"
                    >
                      Driving License
                    </option>
                    <option
                      selected={data && data.idproof === "aadharCard"}
                      value="aadharCard"
                    >
                      Aadhar Card
                    </option>
                    <option
                      selected={data && data.idproof === "nationalIdCard"}
                      value="nationalIdCard"
                    >
                      National ID Card
                    </option>
                  </select>
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="idNumber">
                    ID Number:
                  </label>
                  <input
                    type="text"
                    id="idnumber"
                    className="form-control"
                    value={ContactForm ? ContactForm.idnumber : ""}
                    onChange={handleInputChange}
                    name="idnumber"
                  />
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="issueDate">
                    Issue Date:
                  </label>
                  <input
                    type="date"
                    id="issueDate"
                    className="form-control"
                    value={ContactForm ? ContactForm.issueDate : ""}
                    onChange={handleInputChange}
                    name="issueDate"
                  />
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="idNumber">
                    Country:
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="form-control"
                    onChange={handleInputChange}
                    name="country"
                    value={ContactForm ? ContactForm.country : ""}
                  />
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="issuingAuthority">
                    Issuing Authority:
                  </label>
                  <input
                    type="text"
                    id="IssuingAuthority"
                    name="IssuingAuthority"
                    className="form-control"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.IssuingAuthority : ""}
                  />
                </div>
              </div>
              <div className="text-center mt-2">
                <button className="btn btn-danger me-2" onClick={handleClose}>
                  Cancel
                </button>
                {data.userid ? (
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
                    disabled={isFormDataEmpty}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      {
        authdata && data && (
          <div className="expand">
        <div className="row">
          <div className="col-md-4">
            <p>
              Email : <span> {authdata ? authdata.email : ""} </span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              Mobile No : <span>{authdata ? authdata.mobile_no : ""}</span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              Address :
              <span>
                {data
                  ? `${data.Street},${data.place},${data.taluk},${data.district}`
                  : ""}
              </span>
            </p>
          </div>
        </div>
        <h6 className="">ID Proof</h6>
        <div className="row">
          <div className="col-md-3">
            {data ? (
              <p className="mb-0">
                {data.idproof} <span> {data.idnumber}</span>
              </p>
            ) : (
              "-"
            )}
          </div>
          <div className="col-md-2">
            <p className="mb-0">
              Issue :{" "}
              <span>
                {" "}
                {data ? new Date(data.issueDate).toLocaleDateString() : ""}
              </span>
            </p>
          </div>

          <div className="col-md-2">
            <p className="mb-0">
              Country : <span> {data ? data.country : ""}</span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="mb-0">
              Issuing Authority :{" "}
              <span> {data ? data.IssuingAuthority : ""}</span>
            </p>
          </div>
        </div>
      </div>
        )
      }
     
    </div>
  </>
  );
};

export default ContactInformationForm;
