import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayStudents from "./DisplayStudents";


function Students() {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/students");
        setAllStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("error fetch students");
      }
    };
    fetchStudents();
  }, []);

  return <DisplayStudents allStudents={allStudents} />;
}

export default Students;
