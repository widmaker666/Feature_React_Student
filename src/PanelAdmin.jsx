import React from "react";
import Students from "./components/Students";

function PanelAdmin() {
  return (
    <main>
      <h1>Home page</h1>
      <div className="container-main">               
        <Students />
      </div>
    </main>
  );
}

export default PanelAdmin;
