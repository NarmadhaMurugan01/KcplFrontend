import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CaretLeft,
  UserCircle,
  GitFork,
  Envelope,
  LockOpen,
} from "@phosphor-icons/react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { authapi } from "../config/serverUrl";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Register = () => {
  const inintalvalue = {
    email: "",
    password: "",
    name: "",
    fathername: "",
    familyname: "",
    confrim_password: "",
  };
  const [data, setdata] = useState(inintalvalue);
  const [formErrors, setFormErrors] = useState({});
  const [inputRefs, setInputRefs] = useState([]);
  const [error, setError] = useState("");
  const [valid, setvalid] = useState(true);
  const [iserror, setIserror] = useState(false);
  const [mobile_no, setmobile_no] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    password: false,
    confirm_password: false,
    name: false,
    fathername: false,
    familyname: false,
    email: false,
    mobile_no: false,
  });
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [otperror, setotperror] = useState("");
  const [otploading, setotploading] = useState(false);
  const bottomRef = useRef(null);
  const [resendloading, setresendLoading] = useState(false);
  const [resendotpSent, setresendOtpSent] = useState(false);

  const [timeOTP, settimeOTP] = useState("");
  const [remainingTime, setRemainingTime] = useState(120);
  const [arrowbutton, setarrowbutton] = useState(false);

  const [phone_valid, setphone_valid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInputRefs((inputRefs) =>
      Array(6)
        .fill()
        .map((_, i) => inputRefs[i] || React.createRef())
    );
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    setotperror("");

    if (value.length <= 1 && !isNaN(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (value && inputRefs[index + 1] && inputRefs[index + 1].current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handlemobileno = (value) => {
    setmobile_no(value);
    setvalid(validationmobileno(value));
    setMobileError("");
  };

  const validationmobileno = (phonenumber) => {
    const mobilepattern = /^\d{10}$/;
    return mobilepattern.test(phonenumber);
  };
  useEffect(() => {
    let intervalId;
    if (timeOTP && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timeOTP, remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const isInvalidOTP = otp.some(
      (digit) => digit === "" || digit.length !== 1
    );
    if (isInvalidOTP) {
      setotperror("Please enter a valid 6-digit OTP number.");
      return;
    } else {
      setotperror("");
    }
    setotploading(true);

    try {
      const response = await axios.post(`${authapi}/auth/otp_no`, {
        OTP_no: otp,
      });
      if (response.data.code == 200) {
        setTimeout(() => {
          setotperror("");
          navigate("/verified");

          setTimeout(() => {
            navigate("/login");
          }, 4000);
        }, 2000);
      } else if (response.data.code == 404) {
        setVerified(false);
        setotperror("Incorrect or OTP Expired");
      }

      setTimeout(() => {
        setotploading(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      setotperror("Error verifying OTP. Please try again.");
      setTimeout(() => {
        setotploading(false);
      }, 2000);
    }
  };
  const handleresend = async (e) => {
    e.preventDefault();
    setresendLoading(true);
    const email_id = data.email;
    try {
      const res = await axios.post(`${authapi}/auth/mobile`, {
        email: email_id,
        mobile_no: mobile_no,
      });
      const data = res.data;
      setRemainingTime(120);
      setresendLoading(false);
      setresendOtpSent(true);
    } catch (error) {
      console.error("Error while sending OTP:", error);
      setresendLoading(false);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain").slice(0, 6);
    const newOTP = [...otp];
    pasteData.split("").forEach((char, index) => {
      newOTP[index] = char;
      if (inputRefs[index + 1] && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    });
    setOTP(newOTP);
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      inputRefs[index - 1].current.focus();
    }
  };

  const handlesignup = (e) => {
    const { id, value } = e.target;
    setdata((prevData) => ({ ...prevData, [id]: value }));
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [id]: true,
    }));
    if (formErrors[id]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setTouchedFields({
      password: true,
      confirm_password: true,
      name: true,
      fathername: true,
      familyname: true,
      email: true,
      mobile_no: true,
    });
    const errors = validate(data);
    setFormErrors(errors);
    if (!mobile_no || mobile_no.length !== 12) {
      setMobileError("Please enter a valid 10-digit mobile number.");
    } else {
      setMobileError("");
    }

    if (!mobileError && Object.keys(errors).length === 0) {
      setarrowbutton(true);
      try {
        const res = await axios.post(`${authapi}/auth/signup`, {
          ...data,
          mobile_no: mobile_no,
        });
        const data1 = res.data;
        settimeOTP(true);
        if (data1.code == 200) {
          handleNextClick();
        } else if (data1.code == 409) {
          setError("User already exists");
        }
      } catch (error) {
        if (error.response) {
          console.error(
            "Server responded with status code:",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        }
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.fathername) {
      errors.fathername = "Father's name is required!";
    }
    if (!values.familyname) {
      errors.familyname = "Family name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirm password is required";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }
    return errors;
  };

  const lastFourDigits = mobile_no.substring(mobile_no.length - 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const paragraphs = [
    <div>
      <div className="bottom" ref={bottomRef}>
        <h4 className="">Step 1</h4>
        <p>Add your basic details</p>
        <Grid container spacing={2}>
  <Grid item xs={6}>
    
    <div className="">
              <div className="input-group mt-4 me-2">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      borderColor:
                        touchedFields.name && formErrors.name ? "red" : "",
                    }}
                  >
                    <UserCircle size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  onChange={handlesignup}
                  value={data.name}
                  style={{
                    borderColor:
                      touchedFields.name && formErrors.name ? "red" : "",
                  }}
                />
              </div>
              {formErrors.name && (
                <p style={{ color: "red" }}>{formErrors.name}</p>
              )}
            </div>
    
  </Grid>
  <Grid item xs={6}>
    <div className="">
              <div className="input-group mt-4 ms-md-2">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      borderColor:
                        touchedFields.fathername && formErrors.fathername
                          ? "red"
                          : "",
                    }}
                  >
                    <UserCircle size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="fathername"
                  placeholder="Father Name"
                  value={data.fathername}
                  onChange={handlesignup}
                  style={{
                    borderColor:
                      touchedFields.fathername && formErrors.fathername
                        ? "red"
                        : "",
                  }}
                />
              </div>
              <p className="ms-2" style={{ color: "red" }}>
                {formErrors.fathername}
              </p>
            </div>
  </Grid>
</Grid>
        {/* <div className="row gx-0 in-father">
          <div className="col-md-6 col-12">
            <div className="">
              <div className="input-group mt-4 me-2">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      borderColor:
                        touchedFields.name && formErrors.name ? "red" : "",
                    }}
                  >
                    <UserCircle size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  onChange={handlesignup}
                  value={data.name}
                  style={{
                    borderColor:
                      touchedFields.name && formErrors.name ? "red" : "",
                  }}
                />
              </div>
              {formErrors.name && (
                <p style={{ color: "red" }}>{formErrors.name}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="">
              <div className="input-group mt-4 ms-md-2">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      borderColor:
                        touchedFields.fathername && formErrors.fathername
                          ? "red"
                          : "",
                    }}
                  >
                    <UserCircle size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="fathername"
                  placeholder="Father Name"
                  value={data.fathername}
                  onChange={handlesignup}
                  style={{
                    borderColor:
                      touchedFields.fathername && formErrors.fathername
                        ? "red"
                        : "",
                  }}
                />
              </div>
              <p className="ms-2" style={{ color: "red" }}>
                {formErrors.fathername}
              </p>
            </div>
          </div>
        </div> */}
        <div className="input-group mt-4">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{
                borderColor:
                  touchedFields.familyname && formErrors.familyname
                    ? "red"
                    : "",
              }}
            >
              <GitFork size={28} />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            id="familyname"
            placeholder="Family name"
            value={data.familyname}
            onChange={handlesignup}
            style={{
              borderColor:
                touchedFields.familyname && formErrors.familyname ? "red" : "",
            }}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.familyname}</p>
        <div className="input-group mt-4">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{
                borderColor:
                  touchedFields.email && formErrors.email ? "red" : "",
              }}
            >
              <Envelope size={28} />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"
            onChange={handlesignup}
            value={data.email}
            style={{
              borderColor: touchedFields.email && formErrors.email ? "red" : "",
            }}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.email}</p>
        <p style={{ color: "red" }}>{error}</p>
        <div>
          <PhoneInput
            placeholder="Enter phone number"
            country="in"
            className="phone-input mt-4"
            value={mobile_no}
            onChange={handlemobileno}
            inputProps={{
              required: true,
            }}
            style={{
              border:
                touchedFields.mobile_no && mobileError
                  ? "2px solid red"
                  : "2px solid #bbb9b9",
              borderRadius:
                touchedFields.mobile_no && mobileError ? "5px" : "5px",
            }}
          />
        </div>
        {mobileError && <p style={{ color: "red" }}>{mobileError}</p>}
        <div className="input-group mt-4">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{
                borderColor:
                  touchedFields.password && formErrors.password ? "red" : "",
              }}
            >
              <LockOpen size={28} />
            </span>
          </div>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="create password"
            onChange={handlesignup}
            value={data.password}
            style={{
              borderColor:
                touchedFields.password && formErrors.password ? "red" : "",
            }}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.password}</p>
        <div className="input-group mt-4">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{
                borderColor:
                  touchedFields.confirm_password && formErrors.confirm_password
                    ? "red"
                    : "",
              }}
            >
              <LockOpen size={28} />
            </span>
          </div>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            placeholder="confirm password"
            value={data.confirm_password}
            onChange={handlesignup}
            style={{
              borderColor:
                touchedFields.confirm_password && formErrors.confirm_password
                  ? "red"
                  : "",
            }}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.confirm_password}</p>
        <div className="d-flex justify-content-between mt-5">
          <Link to="/login" style={{ color: "#2196F3" }}>
            <button className="btn btn-prime">
              <span>
                <CaretLeft size={28} />
              </span>
              Back
            </button>
          </Link>
          <Link to="/login" style={{ color: "#fff" }}>
            <button className="btn btn-verify" onClick={(e) => handlesubmit(e)}>
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>,
    <div>
      <div className="top">
        <h4 className="mt-5">OTP Verification</h4>
        <p style={{ color: "#8B8B8B" }}>
          Enter the 6 digit code received on your Phone number
          <span
            className="ms-2"
            style={{ color: "#030303", fontWeight: "500" }}
          >
            (+91 *****{lastFourDigits})
          </span>
          <div className="my-3 d-flex justify-content-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                className="opt-box"
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onPaste={handlePaste}
                onKeyDown={(e) => handleBackspace(index, e)}
                ref={inputRefs[index]}
              />
            ))}
          </div>
          <div className="row">
            <div className="col-12">
              {otperror && (
                <p className="otperror" style={{ color: "red" }}>
                  {otperror}
                </p>
              )}
            </div>
            <div className="col-12">
              <div className="text-end mt-2">
                <div className="d-flex justify-content-between mt-2">
                  <div style={{ textAlign: "left" }}>
                    <div style={{ textAlign: "right" }}>
                      {!timeOTP && (
                        <p className="resend-message-disabled">
                          Didn't receive OTP?{" "}
                          <span className="resend-message-disabled">
                            Resend
                          </span>
                        </p>
                      )}
                      {timeOTP && (
                        <div>
                          {remainingTime > 0 && (
                            <p>Time remaining: {formatTime(remainingTime)}</p>
                          )}
                        </div>
                      )}

                      {timeOTP && remainingTime <= 0 && (
                        <p className="resend-message-enabled">
                          Didn't receive OTP?{" "}
                          <span
                            className="resend-message-enabled"
                            onClick={handleresend}
                            style={{ color: "#2196f3", cursor: "pointer" }}
                          >
                            Resend
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    className="btn btn-verify px-4"
                    onClick={handleVerify}
                    disabled={otploading || verified}
                    style={{
                      backgroundColor: verified ? "green" : "",
                      color: verified ? "white" : "",
                    }}
                  >
                    {otploading ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        {verified ? (
                          <>
                            <span style={{ color: "#Fff" }}>Verified</span>{" "}
                            <span>&#10004;</span>
                          </>
                        ) : (
                          <span style={{ color: "#Fff" }}>Verify</span>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </p>
      </div>
    </div>,
  ];

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlepreviousclick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setarrowbutton(false);
  };
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-forms">
          <div className="Auth-form-content">
            <div className="head d-flex">
              {arrowbutton && (
                <Link
                  onClick={handlepreviousclick}
                  style={{ color: "#4A4A4A" }}
                >
                  <CaretLeft size={28} />
                </Link>
              )}

              <div className="d-flex justify-content-center w-100">
                <h5 className="text-center" style={{ color: "#4A4A4A" }}>
                  Create an account
                </h5>
              </div>
            </div>
            <div
              className="content"
              style={{ height: "450px", overflowY: "scroll" }}
            >
              {paragraphs[currentIndex]}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
