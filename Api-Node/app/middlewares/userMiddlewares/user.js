const {
    body
} = require('express-validator/check');


const validateDataUser  =
    [
        body('email').isEmail().withMessage('email em formato inválido'),
        body('password').isLength({
            min: 6,
            max: 10
        }).withMessage('a senha deve conter entre 6 e 10 caracteres')
    ]

module.exports = validateDataUser;


