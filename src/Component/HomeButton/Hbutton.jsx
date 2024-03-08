import React from "react";
import {
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowCircleUp,
  House,
} from "@phosphor-icons/react";

const Hbutton = () => {
  const handleScroll = (direction) => {
    const scrollAmount = 500; // Adjust the scroll amount as needed

    if (direction === "down") {
      window.scrollBy(0, scrollAmount);
    } else if (direction === "up") {
      window.scrollBy(0, -scrollAmount);
    }
  };

  return (
    <div
      className="Home"
      style={{
        position: "fixed",
        right: "6rem",
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "2px",
        top: "40rem",
        // border: "2px solid #1877F2",
      }}
    >
      <div className="home-menu" style={{ position: "relative" }}>
        <House size={25} color="#1877F2" weight="fill" />
        <ArrowCircleLeft
          size={32}
          color="#1877F2"
          style={{
            position: "absolute",
            top: "0",
            left: "-45px",
            "&:hover": {
              backgroundColor: "#1877F2",
              color: "white",
            },
          }}
          className="home-icon"
        />
        <ArrowCircleRight
          size={32}
          color="#1877F2"
          style={{
            position: "absolute",
            top: "0",
            left: "45px",
            "&:hover": {
              backgroundColor: "#1877F2",
              color: "white",
            },
          }}
          className="home-icon"
        />
        <ArrowCircleUp
          size={32}
          color="#1877F2"
          style={{
            position: "absolute",
            top: "-45px",
            left: "-5",
            "&:hover": {
              backgroundColor: "#1877F2",
              color: "white",
              cursor: "pointer",
            },
          }}
          className="home-icon"
          onClick={() => handleScroll("down")}
        />
        <ArrowCircleDown
          size={32}
          color="#1877F2"
          style={{
            position: "absolute",
            top: "45px",
            left: "-2",
            "&:hover": {
              backgroundColor: "#1877F2",
              color: "white",
              cursor: "pointer",
            },
          }}
          className="home-icon"
          onClick={() => handleScroll("down")}
        />
      </div>
    </div>
  );
};

export default Hbutton;
