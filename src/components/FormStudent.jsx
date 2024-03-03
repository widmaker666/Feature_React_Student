import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { ImageUploader } from "./ImageUploader";

function FormStudent() {
  //! Constantes //
  const navigate = useNavigate();
  const id = uuidv4();

  const [avatar, setAvatar] = useState("");
  const [selectedImg, setSelectedImg] = useState(false);
  const [values, setValues] = useState({
    id: "",
    photo: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
  });

  //!Function Handle //
  const handleAvatarChange = (image) => {
    const imageUrl = URL.createObjectURL(image);
    setAvatar(imageUrl);
    setValues(() => setValues({ ...values, photo: imageUrl }));
    setSelectedImg(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  //! Framer motion //
  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="form-add-student"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        <div className="img">
          {avatar && <img src={avatar} alt="Avatar" required />}
        </div>
        <div className="div-img">
          <ImageUploader onImageChange={handleAvatarChange} />
        </div>

        <motion.div
          className="div-fName"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
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
        </motion.div>

        <motion.div
          className="div-lName"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            placeholder="Krueger...."
          />
        </motion.div>

        <motion.div
          className="div-email"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="freddy.krueger@gmail.com"
          />
        </motion.div>

        <motion.div
          className="div-phone"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            required
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            placeholder="+33123456789"
          />
        </motion.div>

        <motion.div
          className="div-birth"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label htmlFor="date-birth">Date of Birth</label>
          <input
            type="date"
            required
            onChange={(e) =>
              setValues({ ...values, dateOfBirth: e.target.value })
            }
            id="date-birth"
          />
        </motion.div>

        <motion.div
          className="div-gender"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            onChange={(e) => setValues({ ...values, gender: e.target.value })}
            required
          >
            <option value="">Select gender</option>

            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </motion.div>

        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Confirmed
        </motion.button>
      </motion.form>
      <Link className="back-home" to="/">
        Back
      </Link>
    </>
  );
}

export default FormStudent;
