const express = require('express');
const router = express.Router();
const services = require('../controllers/ServicesController');

router.post('/gerarPdf', (req, res) => {
    services.gerarPdf(req, res);
});



module.exports = app => app.use("/services", router);