import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRecycle } from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#16A34A",
        color: "white"
      }}
    >

      <h2 style={{display:"flex",alignItems:"center",gap:"10px"}}>
        <FaRecycle/>
        Smart Waste
      </h2>

      <div style={{display:"flex",gap:"20px"}}>

        <Link to="/dashboard" style={{color:"white",textDecoration:"none"}}>
          Dashboard
        </Link>

        <Link to="/report" style={{color:"white",textDecoration:"none"}}>
          Report Waste
        </Link>

        <button
          onClick={logout}
          style={{
            background:"white",
            color:"#16A34A",
            border:"none",
            padding:"8px 15px",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          Logout
        </button>

      </div>

    </motion.nav>

  );
}

export default Navbar;