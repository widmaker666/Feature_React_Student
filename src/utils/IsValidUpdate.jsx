export const isValidUpdate = (values) => {
  if (!/^[a-zA-Z-]+$/.test(values.firstName.trim())) {
    alert(
      "Please enter a valid first name (only alphabetic characters and hyphens are allowed)"
    );
    return;
  }

  if (!/^[a-zA-Z-]+$/.test(values.lastName.trim())) {
    alert(
      "Please enter a valid last name (only alphabetic characters and hyphens are allowed)"
    );
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dateOfBirth.trim())) {
    alert("Please enter a valid date of birth (YYYY-MM-DD)");
    return;
  }

  if (
    values.gender !== "male" ||
    (values.gender !== "female" && !/^[a-zA-Z-]+$/.test(values.gender.trim()))
  ) {
    alert("Please enter a valide gender (male or female)");
    return;
  }

  if (!/^\d+$/.test(values.phone.trim())) {
    alert(
      "Please enter a valid phone number (only numeric characters are allowed)"
    );
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    alert("Please enter a valid email");
    return;
  }
};
