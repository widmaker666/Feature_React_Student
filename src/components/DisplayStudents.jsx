import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CreateBtn from "../utils/CreateBtn";

function DisplayStudents({ allStudents }) {
  const [sortBy, setSortBy] = useState(null);
  const [numToShow, setNumToShow] = useState(5);

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

  const sortedStudents = allStudents
    ?.slice()
    .sort((a, b) => a[sortBy]?.localeCompare(b[sortBy]));

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
      <CreateBtn />
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sortedStudents?.slice(0, numToShow).map((student) => (
          <motion.div
            className="student-container"
            key={student.id}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container-img">
              <motion.img
                src={student.photo}
                alt={student.firstName}
                whileHover={{ rotate: 10, transition: { duration: 0.3 } }}
              />
            </div>
            <div className="content-student">
              <p>First Name: {student.firstName}</p>
              <p>Last Name: {student.lastName}</p>
              <p>Gender: {student.gender}</p>
            </div>
            <div className="container-btn">
              <Link className="read-btn" to={`/student/${student.id}`}>
                Read
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {numToShow < sortedStudents.length && (
        <button className="btn-showmore" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </>
  );
}

export default DisplayStudents;
