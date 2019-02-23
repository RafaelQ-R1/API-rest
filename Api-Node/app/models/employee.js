const mongoose = require('../../database/mongo_connect');
const bcrypt = require('bcryptjs');
const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false,

    },
    office_title: [{
        type: String,
        require: true,

    }],

    permit: {
        type: String,
        require: true

    },
    passwordResetToken: {
        type: String,
        select: false,

    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },

    office: {
        type: String,
        required: true,

    },


    DataInserção: {
        type: Date,
        default: Date.now,
    },

});

employeeSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;