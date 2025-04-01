import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); 
    navigate("/");  
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Logging out...</h2>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    background: "#121212",
    color: "white",
    height: "100vh",
  },
};

export default Logout;