import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import under from "../assets/images/Development.svg";

const Maintainence = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Stagger text animation
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, x: "100%" },
      { opacity: 1, x: 0, duration: 1, stagger: 0.2 }
    );

    // Scale image animation
    gsap.fromTo(
      imageRef.current,
      { width: "0rem" },
      { width: "41rem", duration: 1 }
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        gsap.to(imageRef.current, {
          width: "12rem",
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(textRef.current.children[1], {
          fontSize: "24px",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(imageRef.current, {
          width: "41rem",
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(textRef.current.children[1], {
          fontSize: "90px",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    handleResize(); // Call the function initially to set the initial styles based on the window size

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Maintain">
      <div className="card d-flex justify-content-between">
        <div className="text-container" ref={textRef}>
          <h2
            className="text-center"
            style={{ fontSize: "30px", fontWeight: "500" }}
          >
            Welcome To
          </h2>
          <h2
            className="text-center"
            style={{ fontSize: "90px", fontWeight: "800", color: "#1877F2" }}
          >
            Kodukku
          </h2>
          <p
            className="text-center"
            style={{ fontSize: "14px", fontWeight: "500" }}
          >
            Our Website is under Development
          </p>
        </div>
        <div className="img-under">
          <center>
            <img src={under} alt="" style={{ width: "0rem" }} ref={imageRef} />
          </center>
        </div>
      </div>
    </div>
  );
};

export default Maintainence;
