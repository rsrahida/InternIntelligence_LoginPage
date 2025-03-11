import React from "react";
import "./SignUp.css";
import image from "../../assets/images/planet.jpg";
import StarBackground from "../StarBackground/StarBackground";

const SignUp = () => {
  return (
    <div className="signUpPage">
      <img src={image} alt="planet" />
      <StarBackground />
    </div>
  );
};

export default SignUp;
