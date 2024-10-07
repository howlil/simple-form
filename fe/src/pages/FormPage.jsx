import React, { useState } from "react";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { validateForm } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import styles from './styles/formPage.module.css';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3000/api/form", formData)
        .then((response) => {
          navigate("/success", { state: { formData } });
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.data) {
            error.response.data.errors.forEach((err) => toast.error(err));
          } else if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("An error occurred. Please try again later.");
          }
        });
    }
  };

  return (
    <div className={styles.formPage}>
      <Toaster />
      <h1>Responsive Form</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <FormField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <FormField
          label="Phone"
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <FormField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <FormField
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <FormField
          label="Address"
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <Button label="Submit" type="submit" />
      </form>
    </div>
  );
};

export default FormPage;
