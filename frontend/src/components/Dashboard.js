import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/catalog/api/dashboard/');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="dashboard">
            <nav className="navbar">
                <Link to="/update-profile">Update Profile</Link>
                <Link to="/profile">Back to File</Link>
                <Link to="/upload">Upload File</Link>
            </nav>
            <h2>Dashboard</h2>
            {stats && (
                <div>
                    <div className="stats-overview">
                        <p className="total-files">Total Files: {stats.total_files}</p>
                    </div>
                    {stats.file_breakdown && (
                        <div className="stats-table-container">
                            <table className="stats-table">
                                <thead>
                                    <tr>
                                        <th>File Type</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(stats.file_breakdown).map((fileType) => (
                                        <tr key={fileType}>
                                            <td>{fileType.toUpperCase()}</td>
                                            <td>{stats.file_breakdown[fileType]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
