import axios from "axios";

const API = axios.create({
  baseURL: "https://applyuni.genesiswtech.com/crmSystem/public/api",
  headers: {
    Accept: "application/json",
  },
});

// STUDENT REGISTER API

export const registerStudent = (formData) =>
  API.post("students/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// LOGIN API

export const loginUser = (loginData) =>
  API.post("/login", loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export default API;
