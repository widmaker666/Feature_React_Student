import React, { useState } from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

function DisplayStudents({ allStudents }) {
  const [sortBy, setSortBy] = useState(null);
  const [numToShow, setNumToShow] = useState(5); // État pour suivre le nombre de divs d'étudiant à afficher

  const [sortStates, setSortStates] = useState({
    firstName: false,
    lastName: false,
    gender: false,
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortBy(null);
      setSortStates((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    } else {
      setSortBy(field);
      setSortStates((prevState) => ({
        ...prevState,
        [field]: true,
      }));
    }
  };

  const handleShowMore = () => {
    setNumToShow((prevNum) => prevNum + 5);
  };

  const getSortClass = (field) => {
    return sortStates[field] ? "sorted" : "";
  };

  const sortedStudents = allStudents?.slice().sort((a, b) => {
    if (sortBy === "firstName") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "lastName") {
      return a.lastName.localeCompare(b.lastName);
    } else if (sortBy === "gender") {
      return a.gender.localeCompare(b.gender);
    } else {
      return 0;
    }
  });

  return (
    <>
      <h1>Students container for all students</h1>
      <div className="sort-container">
        <h5
          className={getSortClass("firstName")}
          onClick={() => handleSort("firstName")}
        >
          FirstName
        </h5>
        <h5
          className={getSortClass("lastName")}
          onClick={() => handleSort("lastName")}
        >
          LastName
        </h5>
        <h5
          className={getSortClass("gender")}
          onClick={() => handleSort("gender")}
        >
          Gender
        </h5>
      </div>
      <div className="container">
        <div>
          {sortedStudents.slice(0, numToShow).map((student) => (
            <div className="student-container" key={student.id}>
              <div className="container-img">
                <img src={student.photo} alt={student.firstName} />
              </div>
              <form className="content-student">
                <p>First Name: {student.firstName}</p>
                <p>Last Name: {student.lastName}</p>
                <p>Date of Birth: {student.dateOfBirth}</p>
                <p>Gender: {student.gender}</p>
              </form>
              <div className="container-btn">
                <EditBtn />
                <DeleteBtn />
              </div>
            </div>
          ))}
        </div>
      </div>
      {numToShow < sortedStudents.length && (
        <button className="btn-showmore" onClick={handleShowMore}>Show More</button>
      )}
    </>
  );
}

export default DisplayStudents;
