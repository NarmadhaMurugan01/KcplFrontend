  import React, { useState, useRef, useEffect } from "react";
  import { Link } from "react-router-dom";
  import {
    CaretLeft,
    Phone,
    UserCircle,
    GitFork,
    Envelope,
    LockOpen,
  } from "@phosphor-icons/react";
  import axios from "axios";
  import { toast } from "react-toastify";
  import PhoneInput from "react-phone-input-2";
  import "react-phone-input-2/lib/style.css";
 // import "react-phone-input-2/lib/material.css";
import pt from "react-phone-input-2/lang/pt.json";
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';
import { authapi } from "../config/serverUrl";

  import "./login.css";
  import { useNavigate } from 'react-router-dom';
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

    // Mobile useState
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
      mobile_no:false
    });
    // OTP useState
    const [otp, setOTP] = useState(["", "", "", "", "", ""]);
    const [verified, setVerified] = useState(false);
    const [otperror, setotperror] = useState("");
    const [otploading, setotploading] = useState(false);
    const bottomRef = useRef(null);

    //Resend OTP Usestate
    const [resendloading, setresendLoading] = useState(false);
    const [resendotpSent, setresendOtpSent] = useState(false);

    const [timeOTP, settimeOTP] = useState("");
    const [remainingTime, setRemainingTime] = useState(120);
    const [arrowbutton, setarrowbutton] = useState(false);
    const  navigate = useNavigate()

   

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

    // const handlemobileno = (value) => {
    //   setmobile_no(value);
    //   setvalid(validationmobileno(value));
    //   setMobileError("");
    // };
    const handlemobileno = (event) => {
      const { value } = event.target; // Extracting the value from the event
      setmobile_no(value);
      setvalid(validationmobileno(value));
      setMobileError("");
    };

    
    const validationmobileno = (phonenumber) => {
      const mobilepattern = /^\d{10}$/;
      return mobilepattern.test(phonenumber);
    };
    console.log("mobileno", mobile_no);

    

    // Countdown timer effect
    useEffect(() => {
      let intervalId;
      if (timeOTP && remainingTime > 0) {
        intervalId = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
      }

      // if (remainingTime === 0) {
      //   setresendOtpSent(true);
      // }

      // Cleanup function
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
          // mobile_no:mobile_no
        });
        console.log("data:", response.data);

        if (response.data.code == 200) {
          setTimeout(() => {
            // setVerified(true);
            setotperror("");
            // setRemainingTime(0);
            // setOTP(["", "", "", "", "", ""]);
            navigate('/verified')
            
            setTimeout(() => {
              navigate('/login')
            },4000);

          
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
      console.log('thiru');
      e.preventDefault();

     
      setresendLoading(true);
      console.log('dataemail',data.email);

      const email_id = data.email
      try {
        console.log('thiru1');
        const res = await axios.post(`${authapi}/auth/mobile`, {
          email: email_id,
          mobile_no:mobile_no
        });
        const data = res.data;
        console.log("Data:", data);
        setRemainingTime(120);

        
          console.log('thiru2');
          setresendLoading(false);
          setresendOtpSent(true);

      
      } catch (error) {
        console.log('thiru3');
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
      // Update data state
      setdata((prevData) => ({ ...prevData, [id]: value }));

      // Mark the field as touched
      setTouchedFields((prevTouchedFields) => ({
        ...prevTouchedFields,
        [id]: true,
      }));

      // Clear error message if the field is touched and user starts typing
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
        mobile_no:true,
      });

      // setFormErrors(validate(data));
      // setIsSubmit(true)
      const errors = validate(data);
      setFormErrors(errors);

      // if (!mobile_no || !otp) {
      //   setIserror("Verify Your account");
      //   return;
      // }
      if (!mobile_no || mobile_no.length !== 10) {
        setMobileError("Please enter a valid 10-digit mobile number.");
      
      } else {
        setMobileError("");
      }

      const value1 = otp.join("");
      console.log("value1:", value1);

      if (! mobileError && Object.keys(errors).length === 0) {
        setarrowbutton(true)
        try {
          const res = await axios.post(`${authapi}/auth/signup`, {
            ...data,
            mobile_no:mobile_no
          });

          const data1 = res.data;
          console.log("Data1:", data1);
          settimeOTP(true);

          // setTimeout(() => {
          //   setLoading(false);
          //   setOtpSent(true);
          // }, 2000);
          if (data1.code == 200) {
            //showToast("Registered Successfully");
            // setdata({
            //   password: "",
            //   confirm_password: "",
            //   name: "",
            //   fathername: "",
            //   familyname: "",
            //   email: "",
            // });
            // setOTP(["", "", "", "", "", ""]);
            // setmobile_no("");
            // setVerified(false);
            // setOtpSent(false);
            handleNextClick()
            

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

    let isToastDisplayed = false;

    const showToast = (message) => {
      if (!isToastDisplayed) {
        toast.success(message);
        isToastDisplayed = true;
        setTimeout(() => {
          isToastDisplayed = false;
        }, 3000); // Adjust the timeout as needed
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
      } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
      if (!values.confirm_password) {
        errors.confirm_password = "Confirm password is required";
      } else if (values.password !== values.confirm_password) {
        errors.confirm_password = "Passwords do not match";
      }
      return errors;
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const paragraphs = [
      <div>
      <div className="bottom" ref={bottomRef}>
        <h4 className="">Step 1</h4>
        <p>Add your basic details</p>
        <div className="row gx-0 in-father">
          <div className="col-md-6 col-12">
          <div className="">
            <div className="input-group mt-4 me-2">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  style={{
                    borderColor:
                      touchedFields.name && formErrors.name
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
                id="name"
                placeholder="Name"
                onChange={handlesignup}
                value={data.name}
                // style={{ borderColor: formErrors.name ? 'red' : '' }}
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
                // style={{ borderColor: formErrors.fathername ? 'red' : '' }}
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
        
        </div>
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
            // style={{ borderColor: formErrors.familyname ? 'red' : '' }}
            style={{
              borderColor:
                touchedFields.familyname && formErrors.familyname
                  ? "red"
                  : "",
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
            // style={{ borderColor: formErrors.email ? 'red' : '' }}
            style={{
              borderColor:
                touchedFields.email && formErrors.email ? "red" : "",
            }}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.email}</p>
        <p style={{ color: "red" }}>{error}</p>
{/*        
                <PhoneInput
                  country="in"
                  placeholder="Enter phone number"
                  className=" phone-input mt-4"
                  value={mobile_no}
                  onChange={handlemobileno}
                  inputProps={{
                    required: true,
                  }}
                /> */}
                <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Phone size={28} />
                  </span>
                </div>
                {/* <input
                  type="text"
                  className="form-control"
                  
                  value={mobile_no}
                  onChange={handlemobileno}
                  placeholder="Enter your phone number"
                  style={{
                    borderColor:
                      touchedFields.mobile_no && mobileError ? "red" : "",
                  }}
                /> */}
                <input
                    type="tel"
                    className="form-control"
                    value={mobile_no}
                    onChange={handlemobileno}
                    onKeyPress={(e) => {
                      // Prevent non-numeric characters
                      const pattern = /[0-9]/;
                      if (!pattern.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Enter your phone number"
                    style={{
                      borderColor: touchedFields.mobile_no && mobileError ? "red" : "",
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
                  touchedFields.password && formErrors.password
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
            id="password"
            placeholder="create password"
            onChange={handlesignup}
            value={data.password}
            // style={{ borderColor: formErrors.password ? 'red' : '' }}
            style={{
              borderColor:
                touchedFields.password && formErrors.password
                  ? "red"
                  : "",
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
                  touchedFields.confirm_password &&
                  formErrors.confirm_password
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
            // style={{ borderColor: formErrors.confirm_password ? 'red' : '' }}
            style={{
              borderColor:
                touchedFields.confirm_password &&
                formErrors.confirm_password
                  ? "red"
                  : "",
            }}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.confirm_password}</p>
        {/* <p style={{ color: "red" }}>{iserror}</p> */}
        
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
            <button
              className="btn btn-verify"
              onClick={(e) => handlesubmit(e)}
            >
              Continue
            </button>
          </Link>
        </div>
      </div></div>,
      <div>
      <div className="top">
      {/* <h4>Step1</h4>
      <p>Add your mobile number to create an account</p>
      <PhoneInput
        country={"in"}
        value={mobile_no}
        onChange={handlemobileno}
        inputProps={{
          required: true,
        }}
      />
      {mobileError && <p style={{ color: "red" }}>{mobileError}</p>} */}

      {/* <div className="d-flex justify-content-between mt-2">
        <div style={{ textAlign: "left" }}>
          {!timeOTP && (
            <p className="resend-message-disabled">
              Didn't receive OTP?{" "}
              <span className="resend-message-disabled">Resend</span>
            </p>
            <p>Didn't recieve OTP? <span onClick={handleresend}  style={{color:"#2196f3"}}>Resend</span></p>
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

        <button
          className="btn btn-verify px-4"
          onClick={handlephoneno}
          disabled={loading || otpSent}
          style={{
            backgroundColor: otpSent ? "green" : "",
            color: otpSent ? "white" : "",
          }}
        >
          {loading ? (
            <span>Loading...</span>
          ) : otpSent ? (
            <>
              <span>OTP SENT</span> <span>&#10004;</span>
            </>
          ) : (
            <span>SEND</span>
          )}
        </button>
      </div> */}

      <h4 className="mt-5">OTP Verification</h4>
      <p style={{ color: "#8B8B8B" }}>
        Enter the 6 digit code received on your Phone number
        <span
          className="ms-2"
          style={{ color: "#030303", fontWeight: "500" }}
        >
          (+91 9000123456)
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
        {/* <div className="d-flex justify-content-between"> */}
          {/* <div className="text-end mt-2"> */}
            {/* <button className="btn btn-verify px-4" onClick={handleresend} disabled={resendloading || resendotpSent} style={{ backgroundColor: resendotpSent ? 'green' : '', color: resendotpSent ? 'white' : '' }}>
          {resendloading ? <span>Loading...</span> : (resendotpSent ? <><span>OTP SENT</span> <span>&#10004;</span></> : <span style={{color:"#fff"}}>RESEND</span>)}
          </button>  */}
          {/* </div> */}
          <div className="row">
            <div className="col-12">
            {otperror && <p className="otperror" style={{ color: "red" }}>{otperror}</p>}

            </div>
            <div className="col-12">

            <div className="text-end mt-2">

            <div className="d-flex justify-content-between mt-2">
  <div style={{ textAlign: "left" }}>
    {/* {!timeOTP && (
      <>
        <p>Didn't receive OTP? <span onClick={handleresend} style={{ color: "#2196f3", cursor: "pointer" }}>Resend</span></p>
      </>
    )}

    {timeOTP && (
      <>
        {remainingTime > 0 && (
          <p>Time remaining: {formatTime(remainingTime)}</p>
        )}

        {timeOTP && remainingTime <= 0 && (
          <p>Didn't receive OTP? <span onClick={handleresend} style={{ color: "#2196f3", cursor: "pointer" }}>Resend</span></p>
        )}
      </>
    )} */}


<div style={{ textAlign: 'right' }}>
                {!timeOTP && (
                  <p className="resend-message-disabled">Didn't receive OTP? <span className="resend-message-disabled" >Resend</span></p>
                  // <p>Didn't recieve OTP? <span onClick={handleresend}  style={{color:"#2196f3"}}>Resend</span></p>
                )}

                {timeOTP && (
                  <div>
                    {remainingTime > 0 && (
                      <p>Time remaining: {formatTime(remainingTime)}</p>
                    )}
                  </div>
                )}
                
            {timeOTP && remainingTime <= 0 && (
                  <p className="resend-message-enabled">Didn't receive OTP? <span className="resend-message-enabled" onClick={handleresend} style={{color:"#2196f3", cursor: 'pointer'}} >Resend</span></p>
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
            {/* 
          //<button className="btn btn-verify px-4" onClick={handleVerify}>Verify</button> */}
          </div>
            </div>
          </div>
          </div>
        {/* </div> */}
      </p>
      </div></div>  ];

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handlepreviousclick = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
    setarrowbutton(false)
  };
    return (
      <div>
        <div className="Auth-form-container">
          <form className="Auth-forms">
            <div className="Auth-form-content">
              <div className="head d-flex">

                  {arrowbutton && (
                      <Link onClick={handlepreviousclick} style={{ color: "#4A4A4A" }}>
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
        {/* <button onClick={handleNextClick} disabled={currentIndex === paragraphs.length - 1}>
          Next
        </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Register;
