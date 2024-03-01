import React from "react";
import FromStudent from "../components/FromStudent";

function CreateStudent() {
  return (
    <>
      <main>
        <h1>Add A New Student</h1>
        <div className="container-main">
          <FromStudent />
        </div>
      </main>
    </>
  );
}

export default CreateStudent;
