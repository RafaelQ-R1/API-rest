const Employee = require('../models/employee');
const Office = require('../models/office');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfigProject = require('../config/Project/authProject')
const authConfigOffice = require('../config/Office/authOffice')
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

function generateProjectToken(params = {}) {
    return jwt.sign(params, authConfigProject.secret, {
        expiresIn: 200400,
    });
}

function generateOfficeToken(params = {}) {
    return jwt.sign(params, authConfigOffice.secret, {
        expiresIn: 200400,
    });
}

module.exports.AddEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            office,
            permit
        } = req.body;


        if (!office)
            return res.status(406).send({
                error: 'O cargo deve conter algum valor. Cargo vazio ou indefinido'
            });

        if (await Employee.findOne({
                email
            }))
            return res.status(400).send({
                error: 'Já existe um usuário cadastrado com esse e-mail'
            });



        const OfficeFind = await Office.findOne({
            title: req.body.office
        })
        if (!OfficeFind)
            return res.status(400).send({
                error: `Office not found `
            })


        const employeeCreate = await Employee.create({
            name,
            email,
            password,
            office,
            permit
        });

        await employeeCreate.save();

        employeeCreate.password = undefined;

        if (permit === "project")
            token = generateProjectToken({
                id: employeeCreate.id
            })
        else
            token = generateOfficeToken({
                id: employeeCreate.id
            })

        return res.status(200).send({
            employeeCreate,
            token
        });

    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: 'Ocorreu um erro ao registrar o usuário.'
        });
    }
}


module.exports.ReadEmployee = async (req, res) => {
    try {
        const Employee = await Employee.find()
        return res.status(200).send({
            Employee
        });
    } catch (err) {
        return res.status(400).send({
            error: 'Não foi possível encontrar usuários  '
        });
    }
}


module.exports.ReadOneEmployee = async (req, res) => {
    try {
        const Employee = await Employee.findById(req.params.id)
        return res.status(200).send({
            Employee
        });
    } catch (err) {
        return res.status(400).send({
            error: 'Não foi possível encontrar o usuário'
        });
    }
}


module.exports.AlterEmployee = async (req, res) => {
    const Employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    return res.json(Employee);
}


module.exports.DeleteEmployee = async (req, res) => {
    await Employee.findByIdAndRemove(req.params.id);
    return res.send();

}


module.exports.AutenticarEmployee = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const Employee = await Employee.findOne({
        email
    }).select('+password');

    if (!Employee)
        return res.status(400).send({
            erro: `usuário  não encontrado.`
        })


    if (!await bcrypt.compare(password, Employee.password))
        return res.status(400).send({
            error: "Senha inválida!"
        });

    Employee.password = undefined;


    res.send({
        Employee,
        token: gerarToken({
            id: Employee.id
        }),
    });
}

module.exports.ForgotPassword = async (req, res) => {
    const {
        email
    } = req.body;

    try {
        const Employee = await Employee.findOne({
            email
        });
        if (!Employee)
            return res.status(400).send({
                error: 'Employee not found'
            });
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Employee.findByIdAndUpdate(Employee.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }

        });
        mailer.sendMail({
            from: 'aurensxyr1@gmail.com.com',
            to: email,
            template: 'auth/forgot_password',
            context: {
                token
            },
        }, (err) => {
            if (err)
                console.log(err)
            return res.status(400).send({
                error: 'Cannot send forgot password email'
            });
        })

    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: 'Erro'
        })
    }
}


module.exports.ResetPassword = async (req, res) => {

    const {
        email,
        token,
        password
    } = req.body
    try {

        const Employee = await Employee.findOne({
                email
            })
            .select('+passwordResetToken passwordResetExpires');
        if (!Employee)
            return res.status(400).send({
                error: 'Employee not found'
            });

        if (token !== Employee.passwordResetToken)
            return res.status(400).send({
                error: 'Token invalid'
            });

        const now = new Date();

        if (now > Employee.passwordResetExpires)
            return res.status(400).send({
                error: 'Token expired. generate a new one'
            });

        Employee.password = password;

        await Employee.save();

        res.send();

    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: "Cannot reset Password, try again"
        });
    }

}