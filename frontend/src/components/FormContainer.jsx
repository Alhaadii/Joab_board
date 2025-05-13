import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div
      className="flex flex-col justify-center align-center mt-4"
      style={{ height: "80vh" }}
    >
      {children}
    </div>
  );
};

export default FormContainer;
