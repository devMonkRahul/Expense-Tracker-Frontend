import React from "react";
import "./ErrorPopup.css";
import Lottie from "lottie-react";
import animationData from "../../../assets/Lottie/error.json";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../../../store/features/errorSlice";

const ErrorPopup = () => {

  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.error);

  return status && (
    <div className=" fixed top-0 left-0 h-[100vh] w-[100vw] z-[10000] flex justify-center items-center bg-[#1414145e] backdrop-blur-md alertcontainer">
      <div className="alertcontent bg-[#ffffff]  rounded-md flex flex-col justify-center items-center px-[12%] py-10 gap-1">
        <Lottie animationData={animationData} loop={false} height={200} width={200} />
        <p className="text-2xl font-semibold mb-8 text-black">{message}</p>
        <button
          onClick={() => dispatch(clearError())} 
          className="bg-black text-white py-2 rounded-md px-7 font-semibold border-2 border-black hover:bg-transparent hover:text-black duration-300"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;