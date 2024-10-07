
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isNumeric = (str) => /^\d+$/.test(str);
const isAlpha = (str) => /^[a-zA-Z\s]+$/.test(str);
const isValidAge = (age) => age >= 18 && age <= 100;

const validateForm = ({ name, email, phone, password, age, address }, formData) => {
  let errors = [];

  if (!name || !isAlpha(name)) {
    errors.push('Name must contain only alphabets and cannot be empty.');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Invalid email format.');
  }

  if (!phone || !isNumeric(phone) || phone.length !== 10) {
    errors.push('Phone number must contain exactly 10 digits.');
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  }

  if (!age || !isValidAge(age)) {
    errors.push('Age must be between 18 and 100.');
  }

  if (!address || address.trim() === '') {
    errors.push('Address cannot be empty.');
  }

  const existingSubmission = formData.find(
    (entry) => entry.email === email || entry.phone === phone
  );
  
  if (existingSubmission) {
    errors.push('A submission with the same email or phone number already exists.');
  }

  return errors;
};

module.exports = { validateForm };
