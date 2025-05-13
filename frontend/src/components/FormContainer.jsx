import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div
      className="flex flex-col justify-center align-center"
      style={{ height: "80vh" }}
    >
      {children}
    </div>
  );
};

export default FormContainer;
