import toast from "react-hot-toast";

export const validateForm = (formData) => {
  let errors = {};

  if (!formData.name) {
    errors.name = 'Name is required.';
    toast.error(errors.name);
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
    errors.name = 'Name must contain only alphabets and spaces.';
    toast.error(errors.name);
  }

  if (!formData.email) {
    errors.email = 'Email is required.';
    toast.error(errors.email);
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address.';
    toast.error(errors.email);
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required.';
    toast.error(errors.phone);
  } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number with up to 15 digits (can include country code).';
    toast.error(errors.phone);
  }

  if (!formData.password) {
    errors.password = 'Password is required.';
    toast.error(errors.password);
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
    errors.password = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
    toast.error(errors.password);
  }

  if (!formData.age) {
    errors.age = 'Age is required.';
    toast.error(errors.age);
  } else if (!/^\d+$/.test(formData.age) || formData.age < 18 || formData.age > 100) {
    errors.age = 'Age must be a number between 18 and 100.';
    toast.error(errors.age);
  }

  if (!formData.address) {
    errors.address = 'Address is required.';
    toast.error(errors.address);
  } else if (formData.address.length < 10) {
    errors.address = 'Address must be at least 10 characters long.';
    toast.error(errors.address);
  }

  return errors;
};
