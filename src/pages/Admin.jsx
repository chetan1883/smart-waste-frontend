import React, { useEffect, useState } from "react";
import API from "../api/axios";
import AdminMap from "../components/AdminMap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {

  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}/status`, { status });
      fetchComplaints();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const chartData = [
    {
      name: "Pending",
      value: complaints.filter(c => c.status === "Pending").length
    },
    {
      name: "In Progress",
      value: complaints.filter(c => c.status === "In Progress").length
    },
    {
      name: "Resolved",
      value: complaints.filter(c => c.status === "Resolved").length
    }
  ];

  return (

    <div className="admin-container">

      {/* HEADER */}

      <div className="tiranga-header">

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <h1>🇮🇳 Smart Waste Management System</h1>

        <h2>Admin Dashboard</h2>

        <p>
          Clean City • Green City • Digital India Initiative
        </p>

      </div>


      {/* MAP */}

      <div className="admin-map">

        <AdminMap complaints={complaints} />

      </div>


      {/* CHART */}

      <div className="admin-chart">

        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#16A34A" />
        </BarChart>

      </div>


      {/* TABLE */}

      <table className="admin-table">

        <thead>
          <tr>
            <th>User</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {complaints.map(c => (

            <tr key={c._id}>

              <td>{c.user?.name}</td>

              <td>{c.description}</td>

              <td>{c.location?.address || "Location captured"}</td>

              <td>{c.status}</td>

              <td>

                {c.status === "Pending" && (
                  <button
                    className="start-btn"
                    onClick={() => updateStatus(c._id, "In Progress")}
                  >
                    Start
                  </button>
                )}

                {c.status === "In Progress" && (
                  <button
                    className="resolve-btn"
                    onClick={() => updateStatus(c._id, "Resolved")}
                  >
                    Resolve
                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Admin;