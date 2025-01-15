import React from "react";
import "./ErrorPopup.css";
import Lottie from "react-lottie";
import animationData from "../../../assets/Lottie/error.json";

const ErrorPopup = ({ message, onClose }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" fixed top-0 left-0 h-[100vh] w-[100vw] z-[400] flex justify-center items-center bg-[#1414145e] backdrop-blur-md alertcontainer">
      <div className="alertcontent bg-[#ffffff]  rounded-md flex flex-col justify-center items-center px-[12%] py-10 gap-1">
        <Lottie options={defaultOptions} height={200} width={200} />
        <p className="text-2xl font-semibold mb-8 text-black">{message}</p>
        <button
          onClick={onClose}
          className="bg-black text-white py-2 rounded-md px-7 font-semibold border-2 border-black hover:bg-transparent hover:text-black duration-300"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;