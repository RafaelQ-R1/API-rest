const mongoose = require('../../database/mongo_connect');
const ProjectSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',

    }],

    completed: {
        type: Boolean,
        require: true,
        default: false
    },


    DataInserção: {
        type: Date,
        default: Date.now,

    },

});


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;