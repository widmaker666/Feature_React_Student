export const isValidFormStudent = (values) => {
  if (!/^[a-zA-Z-]+$/.test(values.firstName.trim())) {
    alert(
      "Please enter a valid first name (only alphabetic characters and hyphens are allowed)"
    );
    return false;
  }
  if (!/^[a-zA-Z-]+$/.test(values.lastName.trim())) {
    alert(
      "Please enter a valid last name (only alphabetic characters and hyphens are allowed)"
    );
    return false;
  }
  if (!/^\d+$/.test(values.phone.trim())) {
    alert(
      "Please enter a valid phone number (only numeric characters are allowed)"
    );
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    alert("Please enter a valid email");
    return false;
  }
  return true;
};
