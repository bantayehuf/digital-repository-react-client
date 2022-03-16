import React from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export const ErrorMessages = ({ message, className }) => {
  return (
    <>
      <div className={className}>
        <div className="d-flex justify-content-center">
          <BsFillExclamationCircleFill
            size={20}
            className="mr-1 mt-"
            style={{ marginTop: "3px" }}
          />{" "}
          <h4 className="pl-2">{message}</h4>
        </div>
      </div>
    </>
  );
};
