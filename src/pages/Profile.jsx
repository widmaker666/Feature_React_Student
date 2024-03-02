import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Profile() {
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
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching student");
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };

  const handleUpdate = async () => {
    setUpdatedStudent(student);
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/students/${id}`, updatedStudent);
      setStudent(updatedStudent);
      setEditMode(false);
    } catch (error) {
      console.error("error updating student", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      navigate("/");
    } catch (error) {
      console.error("error deleting student", error);
    }
  };

  if (loading || !student) {
    return <div className="loading-spin">Loading...</div>;
  }

  return (
    <main className="profile">
      <h1>
        Profile of {student.firstName} {student.lastName}
      </h1>

      <div className="profil-container">
        <div className="profil-container-img">
          <img src={student.photo} alt={student.firstName} />
        </div>
        <div className="profil-content-student">
          {editMode ? (
            <>
              <motion.div
                className="div-fName"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }} // Réglez la durée de l'animation ici
              >
                <label htmlFor="firstName">First Name: </label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedStudent.firstName}
                  onChange={handleInputChange}
                />
              </motion.div>
              {/* Ajoutez des animations similaires pour les autres champs */}
            </>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }} // Réglez la durée de l'animation ici
              >
                First Name: {student.firstName}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }} // Réglez la durée de l'animation ici
              >
                Last Name: {student.lastName}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }} // Réglez la durée de l'animation ici
              >
                Date of Birth: {student.dateOfBirth}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }} // Réglez la durée de l'animation ici
              >
                Gender: {student.gender}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }} // Réglez la durée de l'animation ici
              >
                Email: {student.email}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }} // Réglez la durée de l'animation ici
              >
                Phone: {student.phone}
              </motion.p>
            </>
          )}
        </div>
        {!editMode && (
          <div className="profile-btn">
            <button className="edit-btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
        <Link className="back-home" to="/">
          Back
        </Link>
      </div>
    </main>
  );
}

export default Profile;
