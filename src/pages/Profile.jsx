import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
    <>
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
                <div className="div-fName">
                  <label htmlFor="firstName">First Name: </label>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedStudent.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="div-lName">
                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    type="text"
                    name="lastName"
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
                    value={updatedStudent.email}
                    onChange={handleInputChange}
                  />
                  <div className="div-phone">
                    <label htmlFor="phone">phone: </label>
                    <input
                      type="text"
                      name="phone"
                      value={updatedStudent.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>First Name: {student.firstName}</p>
                <p>Last Name: {student.lastName}</p>
                <p>Date of Birth: {student.dateOfBirth}</p>
                <p>Gender: {student.gender}</p>
                <p>Email: {student.email}</p>
                <p>Phone: {student.phone}</p>
              </>
            )}
          </div>
          {editMode ? (
            <button className="edit-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
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
    </>
  );
}

export default Profile;
