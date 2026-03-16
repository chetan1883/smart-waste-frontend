import React, { useState } from "react";
import API from "../api/axios";

function CreateComplaint() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);

      await API.post("/api/complaints", formData);

      alert("Complaint submitted successfully ✅");
      setDescription("");
      setImage(null);

    } catch (error) {
      console.log(error);
      alert("Error submitting complaint ❌");
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

        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default CreateComplaint;