import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UpdateProfile = () => {
    const [user, setUser] = useState({
        username: "",
        phone_number: "",
        addresses: "",
    });

    const [newUsername, setNewUsername] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newAddresses, setNewAddresses] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/catalog/api/user/');
                setUser(response.data);
                setNewUsername(response.data.username);
                setNewPhoneNumber(response.data.phone_number);
                setNewAddresses(response.data.addresses);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load user profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const updateUser = async () => {
        try {
            await api.put('/catalog/api/user/', {
                username: newUsername,
                phone_number: newPhoneNumber,
                addresses: newAddresses,
            });
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
           <nav className="navbar">
                           <Link to="/profile">Back to File</Link>
                           <Link to="/dashboard">Dashboard</Link>
                           <Link to="/upload">Upload File</Link>         
                       </nav>

            <div className="profile-container">
                <h2>Update Profile</h2>
                <div className="profile-form">
                    <label>Username:</label>
                    <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />

                    <label>Phone Number:</label>
                    <input type="text" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />

                    <label>Addresses:</label>
                    <textarea value={newAddresses} onChange={(e) => setNewAddresses(e.target.value)} />

                    <button onClick={updateUser}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
