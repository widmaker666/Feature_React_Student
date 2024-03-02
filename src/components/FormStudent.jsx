import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  const [selectedImg, setSelectedImg] = useState(false);
  const [values, setValues] = useState({
    id: "",
    photo: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleAvatarChange = (image) => {
    const imageUrl = URL.createObjectURL(image);
    setAvatar(imageUrl);
    setValues(() => setValues({ ...values, photo: imageUrl }));
    setSelectedImg(true);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = uuidv4();

    if (!selectedImg) {
      alert("Selected a profile image");
      return;
    }

    await axios
      .post("http://localhost:3001/students", { ...values, id })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-add-student">
        <div className="img">
          {avatar && <img src={avatar} alt="Avatar" required />}
        </div>
        <div className="div-img">
          <ImageUploader onImageChange={handleAvatarChange} />
        </div>

        <div className="div-fName">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            placeholder="Freddy...."
          />
        </div>

        <div className="div-lName">
          <label htmlFor="lastName">First Name</label>
          <input
            type="text"
            id="lastName"
            required
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            placeholder="Krueger...."
          />
        </div>

        <div className="div-birth">
          <label htmlFor="date-birth">Date of Birth</label>
          <input
            type="date"
            required
            onChange={(e) =>
              setValues({ ...values, dateOfBirth: e.target.value })
            }
            id="date-birth"
          />
        </div>

        <div className="div-gender">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            onChange={(e) => setValues({ ...values, gender: e.target.value })}
            required
          >
            <option value="">Select gender</option>{" "}
            {/* Option vide pour le placeholder */}
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit">Confirmed</button>
      </form>
      <Link className="back-home" to="/">
        Back
      </Link>
    </>
  );
}

export default FormStudent;
