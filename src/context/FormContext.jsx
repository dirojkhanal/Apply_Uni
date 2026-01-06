import React, { createContext, useContext, useState } from "react";
import { registerStudent, loginUser } from "../api/api";

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nationality: "",
    country: "",
    countrycode: "",
    contactnumber: "",
    photo: null,
  });

  const updateStudent = (data) =>
    setStudent((prev) => ({ ...prev, ...data }));

  const submitStudent = async () => {
    const form = new FormData();

    // Match backend field names
    form.append("firstName", student.firstName);
    form.append("lastName", student.lastName);
    form.append("email", student.email);
    form.append("nationality", student.nationality);
    form.append("country", student.country);
    form.append("countrycode", student.countrycode);
    form.append("contactnumber", student.contactnumber);

    if (student.photo) {
      form.append("photo", student.photo);
    }

    return await registerStudent(form);
  };

  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const updateLoginUser = (data) =>
    setLoginUserData((prev) => ({ ...prev, ...data }));

  const submitLogin = async () => {
    const response = await loginUser(loginUserData);

    // Save token
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoginUserData({ email: "", password: "" });
  };

  return (
    <FormContext.Provider
      value={{
        // STUDENT REGISTER
        student,
        updateStudent,
        submitStudent,

        // LOGIN
        loginUserData,
        updateLoginUser,
        submitLogin,
        logout,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
