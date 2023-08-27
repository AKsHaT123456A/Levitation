import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/LoginForm/LoginForm";
import RegisterForm from "../pages/RegisterForm/RegisterForm";
import BasicDetails from "../pages/DetailsPage/DetailsPage";
import axios from "axios";
import SubmissionTable from "../pages/SubmissionTable/SubmissionTable";

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<RegisterForm />} />
        <Route
          path="/details"
          element={<BasicDetails />}
        />
        <Route path="/user" element={<SubmissionTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
