const express = require('express');
const UserControllers = require('../controllers/employeeController');
const router = express.Router();
const validate = require('../middlewares/userMiddlewares/user');
const {
    validationResult,
} = require('express-validator/check');


router.post('/adicionar', validate, (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(402).json({
            errors: err.array()
        });
    }
    UserControllers.AddEmployee(req, res);
});


router.put('/alteruser/:id', (req, res) => {
    UserControllers.AlterUser(req, res);
});

router.get('/readuser', (req, res) => {
    UserControllers.ReadUser(req, res);
});

router.get('/readuser/:id', (req, res) => {
    UserControllers.ReadOneUser(req, res);
});

router.delete('/deleteuser/:id', (req, res) => {
    UserControllers.DeleteUser(req, res);
});

router.post('/userAutenticar', (req, res) => {
    UserControllers.AutenticarUser(req, res);

});

router.post('/forgot_password', (req, res) => {
    UserControllers.ForgotPassword(req, res);
});


router.put('/reset_password', (req, res) => {
    UserControllers.ResetPassword(req, res);
});


module.exports = app => app.use("/user", router);