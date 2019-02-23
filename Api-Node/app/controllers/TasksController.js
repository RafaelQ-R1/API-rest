const task = require('../models/task');
module.exports.completeTask = async (req, res) => {
    try {
        const {
            completed,
            CompletedDate
        } = req.body;

        if (await task.findOne({
                task: req.taskId,
                completed: true
            })
        )
            return res.status(400).send({
                error: 'Taks already completed'
            });

        const taskCompleted = await task.findByIdAndUpdate(req.params.taskId, {
            completed,
            CompletedDate
        }, {
            new: true
        });

        return res.status(200).send({
            taskCompleted
        });


    } catch (err) {
        return res.status(400).send({
            error: 'erro ao atualizar a task'
        })

    }
}

module.exports.showTasks = async (req, res) => {

    try {
        const tasks = await task.find()
        return res.status(200).send({
            tasks
        });

    } catch (err) {
        return res.status(400).send({
            error: 'Não foi possível encontrar as tasks  '
        });

    }
}


module.exports.showOneTask = async (req, res) => {
    try {
        const oneTask = await task.findById(req.params.id)
        return res.status(200).send({
            oneTask
        });
    } catch (err) {
        return res.status(400).send({
            error: 'Não foi possível encontrar a task'
        });
    }
}