import React, { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setLat, setLng }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function Report() {

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("description", description);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      if (image) {
        formData.append("image", image);
      }

      await API.post("/complaints", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      alert("Complaint submitted successfully ✅");

      setDescription("");
      setImage(null);
      setPreview(null);

    } catch (error) {

      console.log(error);
      alert("Error submitting complaint");

    }
  };

  return (

    <div>

      <Navbar />

      <div
        style={{
          display:"flex",
          justifyContent:"center",
          padding:"40px"
        }}
      >

        <motion.div
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.5}}
          style={{
            width:"600px",
            background:"white",
            padding:"30px",
            borderRadius:"10px",
            boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
          }}
        >

          <h2 style={{marginBottom:"20px"}}>Report Waste Complaint</h2>

          <form onSubmit={handleSubmit}>

            <textarea
              placeholder="Describe the waste issue..."
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              style={{
                width:"100%",
                padding:"10px",
                borderRadius:"5px",
                border:"1px solid #ccc"
              }}
            />

            <br/><br/>

            <input
              type="file"
              onChange={handleImageChange}
            />

            <br/><br/>

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width:"100%",
                  height:"200px",
                  objectFit:"cover",
                  borderRadius:"8px"
                }}
              />
            )}

            <br/><br/>

            <h4>Select Location</h4>

            <MapContainer
              center={[18.5204, 73.8567]}
              zoom={13}
              style={{
                height:"300px",
                width:"100%",
                borderRadius:"10px"
              }}
            >

              <TileLayer
                attribution="OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <LocationMarker
                setLat={setLatitude}
                setLng={setLongitude}
              />

            </MapContainer>

            <br/>

            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>

            <motion.button
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
              style={{
                background:"#16A34A",
                color:"white",
                padding:"10px 20px",
                border:"none",
                borderRadius:"5px",
                cursor:"pointer"
              }}
            >
              Submit Complaint
            </motion.button>

          </form>

        </motion.div>

      </div>

    </div>

  );
}

export default Report;