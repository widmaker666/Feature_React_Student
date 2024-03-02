import React from "react";

function ReadBtn({ id }) {
  return (
    <>
      <button className="read-btn" to={`/student/${id}`}>Read</button>
    </>
  );
}

export default ReadBtn;
