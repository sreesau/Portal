import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [successMessage, setSuccessMessage] = useState(""); // Success message state

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            console.log("Fetching files... Token:", localStorage.getItem("token"));
            const response = await api.get("/catalog/api/files/");
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("Uploading file... Token:", localStorage.getItem("token"));
            await api.post("/catalog/api/files/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });

            setSuccessMessage("File uploaded successfully!"); // Set success message
            setTimeout(() => setSuccessMessage(""), 3000); // Hide message after 3 sec
            fetchFiles(); // Refresh file list
        } catch (error) {
            console.error("Upload failed!", error);
            alert("Upload failed! Check authentication.");
        }
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/update-profile">Update Profile</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Back to profile</Link>
            </nav>

            <h2>Upload Files</h2>
            
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>

            {/* Display Success Message */}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default FileUpload;
