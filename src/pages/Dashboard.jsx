import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Dashboard() {

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/complaints/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setComplaints(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Pending") return "red";
    if (status === "In Progress") return "orange";
    if (status === "Resolved") return "green";
    return "gray";
  };

  return (

    <div>

      <Navbar />

      <div style={{padding:"30px"}}>

        <h2 style={{marginBottom:"20px"}}>My Complaints</h2>

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
            gap:"20px"
          }}
        >

          {complaints.map((c) => (

            <motion.div
              key={c._id}
              whileHover={{ scale: 1.05 }}
              style={{
                background:"white",
                padding:"20px",
                borderRadius:"10px",
                boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
              }}
            >

              {c.image && (
                <img
                  src={`http://localhost:5000/uploads/${c.image}`}
                  alt="complaint"
                  style={{
                    width:"100%",
                    height:"200px",
                    objectFit:"cover",
                    borderRadius:"8px"
                  }}
                />
              )}

              <h3 style={{marginTop:"10px"}}>{c.description}</h3>

              <p>
                📍 {c.location?.latitude}, {c.location?.longitude}
              </p>

              <p
                style={{
                  color:getStatusColor(c.status),
                  fontWeight:"bold"
                }}
              >
                Status: {c.status}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Dashboard;