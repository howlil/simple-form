const fs = require("fs");
const path = require("path");
const { validateForm } = require("../utils/validation");

const dataFilePath = path.join(__dirname, "../data.json");

const readData = () => {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

exports.submitForm = (req, res) => {
  try {
    const formData = readData();
    const { name, email, phone, password, age, address } = req.body;

    const errors = validateForm(
      { name, email, phone, password, age, address },
      formData
    );

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors,
      });
    }

    const newSubmission = {
      name,
      email,
      phone,
      password,
      age,
      address,
      dateSubmitted: new Date().toISOString(),
    };

    formData.push(newSubmission);
    writeData(formData);

    res.status(200).json({
      message: "Form submitted successfully!",
      data: newSubmission,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting form", error: error.message });
  }
};

exports.getSubmissions = (req, res) => {
  try {
    const formData = readData();
    res.status(200).json({
      message: "Submissions fetched successfully!",
      data: formData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching submissions", error: error.message });
  }
};
