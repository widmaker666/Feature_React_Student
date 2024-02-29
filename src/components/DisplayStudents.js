import React from "react";

function DisplayStudents({ allStudents }) {
  return (
    <>
      <h1>All Students</h1>
      <ul>
        {allStudents?.map((student) => (
          <li key={student.id}>
            <img src={student.photo} alt={student.firstName} />
            <div>
              <p>First Name: {student.firstName}</p>
              <p>Last Name: {student.lastName}</p>
              <p>Date of Birth: {student.dateOfBirth}</p>
              <p>Gender: {student.gender}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DisplayStudents;
