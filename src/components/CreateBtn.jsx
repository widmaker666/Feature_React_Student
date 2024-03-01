import React from "react";
import { Link } from "react-router-dom";

function CreateBtn() {
  return <Link className="btn-create" to="/create-student">create new</Link>;
}

export default CreateBtn;
