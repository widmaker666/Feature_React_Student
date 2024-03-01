import React, { useState } from "react";
import { Link } from "react-router-dom";

function ImageUploader({ onImageChange }) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    onImageChange(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
    </div>
  );
}

function FormStudent() {
  const [avatar, setAvatar] = useState("");

  const handleAvatarChange = (image) => {
    setAvatar(URL.createObjectURL(image));
  };

  return (
    <>
      <form className="form-add-student">
        <div className="img">
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>
        <div className="div-img">
          <label htmlFor="avatar-img">Avatar</label>
          <ImageUploader onImageChange={handleAvatarChange} />
        </div>

        <div className="div-fName">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" value="Freddy" />
        </div>

        <div className="div-lName">
          <label htmlFor="lastName">First Name</label>
          <input type="text" id="lastName" value="Krueger" />
        </div>

        <div className="div-birth">
          <label htmlFor="date-birth">Date of Birth</label>
          <input type="date" id="date-birth" />
        </div>

        <div className="div-gender">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit">Confirm</button>
      </form>
      <Link to="/">Back</Link>
    </>
  );
}

export default FormStudent;
