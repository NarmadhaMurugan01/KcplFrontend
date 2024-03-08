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
import axios from 'axios';
import { wait } from "@testing-library/user-event/dist/utils";
import { toast } from 'react-toastify';

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
const Register = () => {
  const inintalvalue = { email: '', password: '', name: '', fathername: '', familyname: '', confrim_password: '' }
  const [data, setdata] = useState(inintalvalue)
  const [formErrors, setFormErrors] = useState({});
 
  const [inputRefs, setInputRefs] = useState([]);
  
  const [error, setError] = useState(false);
  
 
  const [valid, setvalid] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);


//Mobile usestate
const [mobile_no, setmobile_no] = useState("")
const [loading, setLoading] = useState(false);
const [otpSent, setOtpSent] = useState(false);
const [mobileError, setMobileError] = useState('');

//OTP Usestates
const [otp, setOTP] = useState(["", "", "", "", "", ""]);
const [verified, setVerified] = useState(false);
const [otperror, setotperror] = useState('')
const [otploading,setotploading] = useState(false)

  useEffect(() => {
    setInputRefs(inputRefs => (
      Array(6).fill().map((_, i) => inputRefs[i] || React.createRef())
    ));
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    console.log('value:', value);
    setotperror('');
  
    if (value.length <= 1 && !isNaN(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
     if (value && inputRefs[index + 1] && inputRefs[index + 1].current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };
  
  console.log('otp:', otp);

  /// mobileno validation
  const handlemobileno = (value) => {
    setmobile_no(value)
    setvalid(validationmobileno(value))
    setMobileError('');
  }

  console.log('mobileno:', mobile_no);

  const validationmobileno = (phonenumber) => {

    const mobilepattern = /^\d{10}$/;
    return mobilepattern.test(phonenumber)

  }
  const handlephoneno = async (e) => {
    e.preventDefault();

    if (!mobile_no || mobile_no.length !== 10) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    } else {
      setMobileError('');
    }
   setLoading(true);

   try {
      const res = await axios.post('http://192.168.1.13:8080/auth/mobile', mobile_no);
      const data = res.data;
      console.log('data:', data);
  
      // Update loading and otpSent states after OTP request is successful
      setTimeout(() => {
        setLoading(false);
        setOtpSent(true); 
      }, 2000);
    } catch (error) {
      console.error('Error while sending OTP:', error);
      setLoading(false);
    }
  };
  

  ///OTP Validation
  const handleverify = async (e) => {
    e.preventDefault();

    const isInvalidOTP = otp.some(digit => digit === "" || digit.length !== 1);

        if (isInvalidOTP) {
          setotperror('Please enter a valid 6-digit OTP number.');
          return;
        } else {
          setotperror('');
        }
  
    setotploading(true); 
    
    
    try {
      const response = await axios.post('http://192.168.1.13:8080/auth/otp_no', {
        OTP_no: otp
      });
      console.log('data:', response.data);
      if (response.data.code == 200) {
        setVerified(true);
        setotperror('');
      } else {
         setVerified(false);
        setotperror('Incorrect OTP. Please try again.');
      }
  
    } catch (error) {
      console.error('Error:', error.message);
      // Handle errors
    } finally {
      setotploading(false); 
    }
  };
  

   const handleresend = () => {

   }
  


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

     e.preventDefault();
    const { id, value } = e.target;

    setdata((prevData) => ({
      ...prevData,
      [id]: value
    }));

   setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }));

  }
  

  //form validation
  const handlesubmit = async (e) => {
    e.preventDefault()

    setFormErrors(validate(data));
    setIsSubmit(true)

    const value1 = otp.join('');
    console.log('value1:', value1);

    try {
      const res = await axios.post('http://192.168.1.13:8080/auth/signup', {
        ...data,
        OTP_no: value1
      });

      const data1 = res.data;
      console.log('Data1:', data1);
    } catch (error) {
      if (error.response) {

        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {

        console.error('No response received from server.');
      } else {

        console.error('Error during request setup:', error.message);
      }
    }


  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);


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
      errors.confirm_password = "Confirm password is required!";
    }
    return errors;
  };



  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-forms" >
          <div className="Auth-form-content">
            <div className="head d-flex">
              <Link to="/login" style={{ color: "#4A4A4A" }}>
                <CaretLeft size={28} />
              </Link>
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
              <h4>Step1</h4>
              <p>Add your mobile number to create an account</p>
              <PhoneInput
                country={'us'}
                value={mobile_no}
                onChange={handlemobileno}
                inputProps={{
                  required: true
                }}
              />
             {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}
              {/* <div className="text-end mt-2">
                <button className="btn btn-verify px-4 disable:optimicty-20" onClick={(e) => handlephoneno(e)}>Send</button>
              </div> */}
               <div className="text-end mt-2">
                  <button className="btn btn-verify px-4" onClick={handlephoneno} disabled={loading || otpSent} style={{ backgroundColor: otpSent ? 'green' : '', color: otpSent ? 'white' : '' }}>
                    {loading ? <span>Loading...</span> : (otpSent ? <><span>OTP SENT</span> <span>&#10004;</span></> : <span>SEND</span>)}
                  </button>
                </div>


              <h4 className="mt-5">OTP Verification</h4>
              <p style={{ color: "#8B8B8B" }}>
                Enter the 6 digit code received on your Phone number
                <span className="ms-2" style={{ color: "#030303", fontWeight: "500" }}>
                  (+91 90000123456)
                </span>
                <div className="my-3 d-flex justify-content-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onPaste={handlePaste}
                      onKeyDown={(e) => handleBackspace(index, e)}
                      ref={inputRefs[index]}
                      style={{
                        width: "40px",
                        textAlign: "center",
                        height: "40px",
                        padding: "5px",
                        margin: "10px",
                        fontWeight: "500",
                        border: "2px solid #68BCFF",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-prime px-3" onClick={(e)=>handleresend(e)}>Resend OTP</button>
                  {/* <button className="btn btn-verify px-4 hover:opacity-80" onClick={(e) => handleverify(e)}>
                    {verified ? (
                      <>
                        <span style={{ color: 'green' }}>Verified</span> <span>&#10004;</span>
                      </>
                    ) : (
                      <span style={{ color: 'white' }}>Verify OTP</span>
                    )}
                  </button> */}
                  {/* <button className={`btn btn-verify px-4 ${verified ? 'btn-green' : ''} ${!verified && 'hover:opacity-80'}`} onClick={handleverify} disabled={otploading || otpSent} style={{ backgroundColor: verified ? 'green' : '', color: verified ? 'white' : '' }}>
  {otploading ? <span>Loading...</span> : (verified ? <><span>Verified</span> <span>&#10004;</span></> : <span>Verify OTP</span>)}
</button>
     */}

<button
                    className="btn"
                    style={{
                      backgroundColor: verified ? "green" : "#2196f3",
                      color: verified ? "white" : "white",
                    }}
                    onClick={handleVerify}
                    disabled={loading || verified}
                  >
                    {loading ? (
                      <div className="spinner"></div>
                    ) : verified ? (
                      "Verified"
                    ) : (
                      "Verify"
                    )}
                  </button>

    


                </div>
                {otperror && <p style={{ color: 'red' }}>{otperror}</p>}
                {/* {errorOTP && <p>Please enter a valid OTP Number</p>} */}
              </p>
              <div className="bottom" ref={bottomRef}>
              <h4 className="mt-5">Step 2</h4>
              <p>Add your basic details</p>
              <div className="d-flex">
                <div className="">

                  <div className="input-group mt-4 me-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text"
                                            style={{ borderColor: formErrors.name ? 'red' : '' }}                                            >
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
                      style={{ borderColor: formErrors.name ? 'red' : '' }}
                    />
                  </div>
                  {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
                </div>
                <div className="">
                  <div className="input-group mt-4 ms-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text"  style={{ borderColor: formErrors.name ? 'red' : '' }}>
                        <UserCircle size={28} />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="fathername"
                      placeholder="Father Name"
                      onChange={handlesignup}
                      style={{ borderColor: formErrors.fathername ? 'red' : '' }}
                    />
                  </div>
                  <p className="ms-2" style={{ color: 'red' }}>{formErrors.fathername}</p>
                </div>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"  style={{ borderColor: formErrors.name ? 'red' : '' }}>
                    <GitFork size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="familyname"
                  placeholder="Family name"
                  onChange={handlesignup}
                  style={{ borderColor: formErrors.familyname ? 'red' : '' }}
                />
              </div>
              <p style={{ color: 'red' }}>{formErrors.familyname}</p>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"  style={{ borderColor: formErrors.name ? 'red' : '' }}>
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
                  style={{ borderColor: formErrors.email ? 'red' : '' }}
                />
              </div>
              <p style={{ color: 'red' }}>{formErrors.email}</p>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"  style={{ borderColor: formErrors.name ? 'red' : '' }}>
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
                  style={{ borderColor: formErrors.password ? 'red' : '' }}
                />
              </div>
              <p style={{ color: 'red' }}>{formErrors.password}</p>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text"  style={{ borderColor: formErrors.name ? 'red' : '' }}>
                    <LockOpen size={28} />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  placeholder="confirm password"
                  onChange={handlesignup}
                  style={{ borderColor: formErrors.confirm_password ? 'red' : '' }}
                />
              </div>
              <p style={{ color: 'red' }}>{formErrors.confirm_password}</p>
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
                  <button className="btn btn-verify" onClick={(e) => handlesubmit(e)}>Continue</button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

};
export default Register;
