
//        // Check if both email and password are empty
// // if ((!email || !email.trim()) && (!password || !password.trim())) {
// //   toast.error("Email and Password are required");
// //   return;
// // }


// // if (!email || !email.trim()) {
// //   toast.error("Email is required");
// //   return;
// // } else if (!isValidEmail(email)) {
// //   toast.error("Invalid Email Address");
// //   return;
// // }


// // if (!password || !password.trim()) {
// //   toast.error("Password is required");
// //   return;
// // } else if (password.length < 8) {
// //   toast.error("Password must be at least 8 characters long");
// //   return;
// // }


// // function isValidEmail(email) {
  
// //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   return emailPattern.test(email);
// // }



// import React, { useState } from 'react';

// const OTPVerificationForm = () => {
//   const [verified, setVerified] = useState(false);
//   const [error, setError] = useState('');

//   const handleVerifyOTP = async () => {
//     try {
//       // Replace 'your-api-endpoint' with your actual API endpoint for OTP verification
//       const response = await fetch('your-api-endpoint', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ otp: 'value from input field' }), // You need to replace 'value from input field' with actual OTP value entered by the user
//       });

//       if (response.ok) {
//         // OTP verification successful
//         setVerified(true);
//         setError('');
//       } else {
//         // OTP verification failed
//         setVerified(false);
//         setError('Incorrect OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <input type="text" placeholder="Enter OTP" />
//       <button onClick={handleVerifyOTP}>
//         {verified ? (
//           <>
//             <span style={{ color: 'green' }}>Verified</span> <span>&#10004;</span>
//           </>
//         ) : (
//           <span style={{ color: 'blue' }}>Verify OTP</span>
//         )}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default OTPVerificationForm;




// if (!data.email || !data.name || !data.fathername || !data.familyname || !data.password || !data.confrim_password) {
//        toast.error("Email and Password are required");
//        return;
//      }
     
     
//      // if (!email || !email.trim()) {
//      //   toast.error("Email is required");
//      //   return;
//      // } else if (!isValidEmail(email)) {
//      //   toast.error("Invalid Email Address");
//      //   return;
//      // }
     
     
//      // if (!password || !password.trim()) {
//      //   toast.error("Password is required");
//      //   return;
//      // } else if (password.length < 8) {
//      //   toast.error("Password must be at least 8 characters long");
//      //   return;
//      // }
     



//      import React, { useState } from "react";

// const ButtonLoader = () => {
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);

//   const fetchData = () => {
//     setLoading(true);

//     // Faking API call here
//     setTimeout(() => {
//       setLoading(false);
//       setOtpSent(true);
//     }, 2000);
//   };

//   return (
//     <div style={{ marginTop: "60px" }}>
//       <button className={`button ${otpSent ? 'button-green' : ''}`} onClick={fetchData} disabled={loading || otpSent}>
//         {loading && (
//           <i
//             className="fa fa-refresh fa-spin"
//             style={{ marginRight: "5px" }}
//           />
//         )}
//         {loading ? <span>Loading Data from Server</span> : (otpSent ? <><span>OTP SENT</span> <span>&#10004;</span></> : <span>Fetch Data from Server</span>)}
//       </button>
//     </div>
//   );
// };

// export default ButtonLoader;



// if (!mobile_no || mobile_no.length !== 12) {
    //   setMobileError('Please enter a valid 10-digit mobile number.');
    //   return;
    // } else {
    //   setMobileError('');
    // }



    // return (
    //     <div>
    //       <div className="Auth-form-container">
    //         <form className="Auth-forms">
    //           <div className="Auth-form-content">
    //             <div className="head d-flex">
    //               <Link to="/login" style={{ color: "#4A4A4A" }}>
    //                 <CaretLeft size={28} />
    //               </Link>
    //               <div className="d-flex justify-content-center w-100">
    //                 <h5 className="text-center" style={{ color: "#4A4A4A" }}>
    //                   Forgot Password
    //                 </h5>
    //               </div>
    //             </div>
    //             <div
    //               className="content"
    //               style={{ height: "450px", overflowY: "scroll" }}
    //             >
    //               <h4>Mobile Number Verification</h4>
    //               <p>
    //                 Please enter your registered Mobile number to receive
    //                 verification code
    //               </p>
    //               <div className="row align-items-center">
    //                 <div className="col-8">
    //                   <div className="input-group mt-3">
    //                     <div className="input-group-prepend">
    //                       <span className="input-group-text">
    //                         <Phone size={28} />
    //                       </span>
    //                     </div>
    //                     <input
    //                     type="text"
    //                     className="form-control"
    //                     id="email"
    //                     placeholder="Email"
    //                     onChange={handle_emailid}
    //                      style={{ borderColor: Error.email ? 'red' : '' }}
    //                   />
    //                   </div>
    //                   {Error && <p style={{ color: 'red' }}>{Error}</p>}
    //                 </div>
    //                 <div className="text-end mt-2">
    //                 <button className="btn btn-verify px-4" onClick={handlegetOTP} disabled={loading || otpSent} style={{ backgroundColor: otpSent ? 'green' : '', color: otpSent ? 'white' : '' }}>
    //                   {loading ? <span>Loading...</span> : (otpSent ? <><span>OTP SENT</span> <span>&#10004;</span></> : <span>GET OTP</span>)}
    //                 </button>
    //               </div>
    //               </div>
    //               <h4 className="mt-5">OTP Verification</h4>
    //               <p style={{ color: "#8B8B8B" }}>
    //                 Enter the 6 digit code received on your Phone number
    //                 <span
    //                   className="ms-2"
    //                   style={{ color: "#030303", fontWeight: "500" }}
    //                 >
    //                   (+91 90000123456)
    //                 </span>
    //                 <div className="my-3 d-flex justify-content-center">
    //                   {otp.map((digit, index) => (
    //                     <input
    //                       key={index}
    //                       type="text"
    //                       maxLength="1"
    //                       value={digit}
    //                       onChange={(e) => handleChange(index, e)}
    //                       onPaste={handlePaste}
    //                       onKeyDown={(e) => handleBackspace(index, e)}
    //                       ref={inputRefs[index]}
    //                       style={{
    //                         width: "40px",
    //                         textAlign: "center",
    //                         height: "40px",
    //                         padding: "5px",
    //                         margin: "10px",
    //                         fontWeight: "500",
    //                         border: "2px solid #68BCFF",
    //                         borderRadius: "5px",
    //                       }}
    //                     />
    //                   ))}
    //                 </div>
    //                 <div className="d-flex justify-content-between">
    //                   <button className="btn btn-prime px-3">Resend OTP</button>
    //                   {/* <button className="btn btn-verify px-4">Verify</button> */}
    //                   <button className="btn btn-prime px-3" onClick={(e)=>handleresend(e)}>Resend OTP</button>
    //                   <button
    //                     className="btn"
    //                     style={{
    //                       backgroundColor: verified ? "green" : "#2196f3",
    //                       color: verified ? "white" : "white",
    //                     }}
    //                     onClick={handleVerify}
    //                     disabled={loading || verified}
    //                   >
    //                     {loading ? (
    //                       <div className="spinner"></div>
    //                     ) : verified ? (
    //                       "Verified"
    //                     ) : (
    //                       "Verify"
    //                     )}
    //                   </button>
    //                 </div>
    //                 {otperror && <p style={{ color: 'red' }}>{otperror}</p>}
    //                 </div>
    //               </p>
    //               <h4 className="mt-5">Change Password</h4>
    //               <p>
    //                 Set the new Password for your account so you can login and
    //                 access all the features
    //               </p>
    //               <div className="input-group mt-4">
    //                 <div className="input-group-prepend"> 
    //                   <span className="input-group-text">
    //                     <LockOpen size={28} />
    //                   </span>
    //                 </div>
    //                 <input
    //                   type="confirmpassword"
    //                   className="form-control"
    //                   id="password"
    //                   placeholder="New password"
    //                   onChange={handelpassword}
    //                   value={reset.password}
    //                 />
    //               </div>
    //               <div className="input-group mt-4">
    //                 <div className="input-group-prepend">
    //                   <span className="input-group-text">
    //                     <LockOpen size={28} />
    //                   </span>
    //                 </div>
    //                 <input
    //                   type="confirmpassword"
    //                   className="form-control"
    //                   id="confirm_password"
    //                   placeholder="confirm password"
    //                   onChange={handelpassword}
    //                   value={reset.confrim_password}
    //                 />
    //               </div>
    //               <div className="d-flex justify-content-between mt-5">
    //                 <Link to="/login" style={{ color: "#2196F3" }}>
    //                   <button className="btn btn-prime">
    //                     <span>
    //                       <CaretLeft size={28} />
    //                     </span>
    //                     Back
    //                   </button>
    //                 </Link>
    //                 <Link to="/login" style={{ color: "#fff" }}>
    //                   <button className="btn btn-verify" onClick={(e)=>handelrestpassword(e)}>Continue</button>
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   );
    // };





     {/* <button
                    className="btn"
                    style={{
                      backgroundColor: verified ? "green" : "#2196f3",
                      color: verified ? "white" : "white",
                    }}
                    onClick={handleVerify}
                    disabled={otploading || verified}
                  > */}
                    {/* {otploading ? (
                      <div className="spinner"></div>
                    ) : verified ? (
                      "Verified"
                    ) : (
                      "Verify"
                    )} */}
                    {/* {otploading ? <span>Loading...</span> : (verified ? <><span>Verified</span> <span>&#10004;</span></> : <span>Verify</span>)}
                  </button> */}