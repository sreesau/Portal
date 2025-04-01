import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FileUpload from "./components/FileUpload";
import UserProfile from "./components/UserProfile";
import Dashboard from './components/Dashboard';
import UpdateProfile from "./components/UpdateProfile";


const App = () => {
    return (
        <Router>
            <Routes>
                 <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Login />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
            </Routes>
        </Router>
    );
};

export default App;