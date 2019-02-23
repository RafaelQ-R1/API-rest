const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/OfficeMiddlewares/auth');
const OfficeController = require('../controllers/officeController');

router.use(authMiddleware)

router.post('/addcargo', (req, res) => {
    OfficeController.AddCargo(req, res);
});

router.put('/altercargo/:id', (req, res) => {
    OfficeController.AlterCargo(req, res);
});

router.get('/readcargo', (req, res) => {
    OfficeController.ReadCargo(req, res);
});

router.get('/readcargo/:id', (req, res) => {
    OfficeController.ReadOneCargo(req, res);
});

router.delete('/deletecargo/:id', (req, res) => {
    OfficeController.DeleteCargo(req, res);
});

module.exports = app => app.use('/cargo' ,router);