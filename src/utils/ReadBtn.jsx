import React from "react";
import { Link } from "react-router-dom";

function ReadBtn({ id }) {
  return (
    <>
      <Link className="read-btn" to={`/student/${id}`}>
        Read
      </Link>
    </>
  );
}

export default ReadBtn;
