import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./login.css"; // Assuming you have some CSS styles defined here

const Verified = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.from(textRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 3,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div className="verified-container">
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content p-5">
            <center>
              <div class="checkmark-circle">
                <div class="background"></div>
                <div class="checkmark draw"></div>
              </div>
            </center>
            <h2 ref={textRef} className="text-center">
              Your Account is Successfully Verified
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verified;

/* Styles */
