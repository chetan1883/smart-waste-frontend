import React, { useState } from "react";
import axios from "axios";

function CreateComplaint() {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://smart-waste-backend-9qy4.onrender.com/api/complaints",
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint submitted successfully ✅");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert("Error submitting complaint");
    }
  };

  return (
    <div>
      <h1>Create Complaint 📝</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your complaint..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default CreateComplaint;