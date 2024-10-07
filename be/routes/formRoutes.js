// routes/formRoutes.js
const express = require('express');
const  router = express.Router();
const formController = require('../controllers/formController');

router.post('/form',  formController.submitForm);
router.get('/submissions', formController.getSubmissions);

module.exports = router;
