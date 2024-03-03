import React from "react";


export function ImageUploader({ onImageChange }) {
    
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      onImageChange(file);
    };
  
    return (
      <div>
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </div>
    );
  }