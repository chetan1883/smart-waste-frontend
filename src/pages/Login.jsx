import React, { useState } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";

function Login() {

  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isLogin) {
        const res = await API.post("/api/auth/login", { email, password });
        //const res = await API.post("/auth/login", { email, password });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        // Redirect based on mode
        if (isAdmin) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }

      } else {
        await API.post("/api/auth/register", { name, email, password });
        //await API.post("/auth/register", { name, email, password });

        alert("Registration successful");
        setIsLogin(true);

      }

    } catch (err) {

      alert("Something went wrong");

    }
  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#16A34A,#0EA5E9)",
        position: "relative"
      }}
    >

      {/* Title */}

      <h1
        style={{
          position: "absolute",
          top: "30px",
          fontSize: "38px",
          color: "white",
          fontWeight: "bold",
          letterSpacing: "2px"
        }}
      >
        🇮🇳 CLEAN INDIA 🇮🇳
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "80px"
        }}
      >

        {/* Cleaner Animation */}

        <div style={{ position: "relative", width: "250px", height: "200px" }}>

          <motion.div
            animate={{ x: [0, 80, 160], opacity: [1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ position: "absolute", fontSize: "30px" }}
          >
            🗑
          </motion.div>

          <motion.div
            animate={{ x: [20, 100, 180], opacity: [1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ position: "absolute", fontSize: "28px" }}
          >
            🧻
          </motion.div>

          <motion.div
            animate={{ x: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: "absolute",
              bottom: "0",
              fontSize: "80px"
            }}
          >
            🧹
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              position: "absolute",
              bottom: "60px",
              fontSize: "70px"
            }}
          >
            🧑‍🔧
          </motion.div>

        </div>


        {/* Login Card */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "380px",
            padding: "40px",
            borderRadius: "15px",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)"
          }}
        >

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            {isLogin ? (isAdmin ? "Admin Login" : "Login") : "Register"}
          </h2>

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={buttonStyle}
            >
              {isLogin ? (isAdmin ? "Admin Login" : "Login") : "Register"}
            </motion.button>

          </form>

          <div style={{ textAlign: "center", marginTop: "15px" }}>

            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setIsAdmin(false);
              }}
              style={{
                color: "#16A34A",
                cursor: "pointer",
                marginLeft: "5px",
                fontWeight: "bold"
              }}
            >
              {isLogin ? "Register" : "Login"}
            </span>

            <br /><br />

            {/* Admin Login Button */}

            {isLogin && !isAdmin && (
              <button
                onClick={() => setIsAdmin(true)}
                style={adminButton}
              >
                Admin Login
              </button>
            )}

            {isLogin && isAdmin && (
              <button
                onClick={() => setIsAdmin(false)}
                style={citizenButton}
              >
                Citizen Login
              </button>
            )}

            <p className="tagline">
              Smart Waste Management for a Better India
            </p>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#16A34A",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const adminButton = {
  padding: "8px 20px",
  background: "#1e293b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const citizenButton = {
  padding: "8px 20px",
  background: "#16A34A",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Login;