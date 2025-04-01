import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const filesResponse = await api.get('/catalog/api/files/');
                setFiles(filesResponse.data);
            } catch (err) {
                console.error("Error fetching files:", err);
                setError("Failed to load files.");
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <Link to="/update-profile">Update Profile</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/upload">Upload File</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="profile-container">
                <h2>Uploaded Files</h2>
                {files.length > 0 ? (
                    <table className="file-table">
                        <thead>
                            <tr>
                                <th>Filename</th>
                                <th>Uploaded At</th>
                                <th>File Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => {
                                const fileType = file.file.split('.').pop().toUpperCase();
                                return (
                                    <tr key={file.id}>
                                        <td>
                                        <a href={`http://127.0.0.1:8000/catalog/api/files/${file.id}/download/`} download>
                                           {file.file.split('/').pop()}
                                        </a>
                                        </td>
                                        <td>{new Date(file.uploaded_at).toLocaleString()}</td>
                                        <td>{fileType}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No files uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
