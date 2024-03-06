import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import SendMessageToStudent from "../components/SendMessageToStudent";
import loader from "../assets/gif/loader1.gif";

function Profile() {
  // !Constantes //
  const { id } = useParams();

  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/students/${id}`
        );

        setTimeout(() => {
          setStudent(response.data);
          setLoading(false);
        }, 350);
      } catch (error) {
        console.error("error fetching student");
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  //! Function handle //
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };

  const handleUpdate = async () => {
    setUpdatedStudent(student);
    setEditMode(true);
  };

  const handleSave = async () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save changes?"
    );

    if (!confirmSave) return;
    try {
      await axios.put(`http://localhost:3001/students/${id}`, updatedStudent);
      setStudent(updatedStudent);
      setEditMode(false);
      alert("Profil updated successfully");
    } catch (error) {
      console.error("error updating student", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete ?");

    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      alert("Profile deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("error deleting student", error);
      alert("Profile deleted error!");
    }
  };

  if (loading || !student) {
    return <img className="loader" src={loader} alt="" />;
  }

  return (
    <motion.main
      className="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>
        Profile of {student.firstName} {student.lastName}
      </h1>

      <div className="profil-container">
        <motion.div
          className="profil-container-img"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={student.photo} alt={student.firstName} />
        </motion.div>
        <div className="profil-content-student">
          {editMode ? (
            <>
              <div className="div-fName">
                <label htmlFor="firstName">First Name: </label>
                <input
                  type="text"
                  name="firstName"
                  maxLength={50}
                  value={updatedStudent.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="div-lName">
                <label htmlFor="lastName">Last Name: </label>
                <input
                  type="text"
                  name="lastName"
                  maxLength={50}
                  value={updatedStudent.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="div-date-birth">
                <label htmlFor="dateOfBirth">date of birth: </label>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={updatedStudent.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="div-gender">
                <label htmlFor="gender">gender: </label>
                <input
                  type="text"
                  name="gender"
                  value={updatedStudent.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div className="div-email">
                <label htmlFor="email">email: </label>
                <input
                  type="text"
                  name="email"
                  maxLength={100}
                  value={updatedStudent.email}
                  onChange={handleInputChange}
                />
                <div className="div-phone">
                  <label htmlFor="phone">phone: </label>
                  <input
                    type="text"
                    name="phone"
                    maxLength={20}
                    value={updatedStudent.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                First Name: {student.firstName}
              </motion.p>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Last Name: {student.lastName}
              </motion.p>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Date of Birth: {student.dateOfBirth}
              </motion.p>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Gender: {student.gender}
              </motion.p>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Email: {student.email}
              </motion.p>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Phone: {student.phone}
              </motion.p>
            </>
          )}
        </div>
        {editMode ? (
          <motion.button
            className="save-btn"
            onClick={handleSave}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Save
          </motion.button>
        ) : (
          <div className="profile-btn">
            <button className="update-btn" onClick={handleUpdate}>
              Update
            </button>
            <SendMessageToStudent studentEmail={student.email} />
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
        <Link className="back-home" to="/">
          Back
        </Link>
      </div>
    </motion.main>
  );
}

export default Profile;
