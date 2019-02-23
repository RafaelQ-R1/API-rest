const Project = require('../models/project');
const Task = require('../models/task');


module.exports.addProject = async (req, res) => {
    try {
        const {
            title,
            description,
            tasks,
        } = req.body;

        if (await Project.findOne({
                title
            }))
            return res.status(400).send({
                error: `já existe o projeto '${title}' em andamento. Tente cadastrar outro.`
            });

        await Project.find().count((err, count) => {
            if (count >= 4) {
                return res.status(400).send({
                    error: `Limite de projetos atingido. Só são permitidos no máximo ${count} projetos`
                })
            }
        });

        if (await Project.findOne({
                user: req.userId
            }))
            return res.status(400).send({
                error: `Você já tem um projeto criado e incompleto. Você não pode criar mais projetos até que seu projeto atual esteja completado ou cancelado`
            });

        const project = await Project.create({
            title,
            description,
            user: req.userId
        });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task,
                project: project._id
            });

            await projectTask.save();

            project.tasks.push(projectTask);

        }));

        await project.save();

        return res.status(200).send({
            project

        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: 'Falha ao criar o projeto'
        });
    }
}


module.exports.loadProjects = async (req, res) => {

    try {
        const projects = await Project.find().populate(['user', 'tasks']);

        return res.status(200).send({
            projects
        });

    } catch (err) {
        return res.status(400).send({
            error: "erro ao ler projetos "
        });
    }
}

module.exports.loadOneProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

        return res.status(200).send({
            project
        });

    } catch (err) {
        return res.status(400).send({
            error: "erro ao ler projeto "
        });
    }

}


module.exports.updateProject = async (req, res) => {

    try {

        const {
            title,
            description,
            tasks,
            completed
        } = req.body;


        if (await Project.findOne({
                Project: req.ProjectId,
                completed: true
            })
        )
        return res.status(400).send({
            error: `Project ${title} already completed`
        })


            const project = await Project.findByIdAndUpdate(req.params.projectId, {
                title,
                description,
                completed
            }, {
                new: true
            });

        project.tasks = [];
        await Task.remove({
            project: project._id
        });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task,
                project: project._id
            });

            await projectTask.save();

            project.tasks.push(projectTask);

        }));

        await project.save();

        return res.status(200).send({
            project
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Falha ao atualizar o projeto'
        });
    }
}


module.exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId);
        return res.send();
    } catch (err) {
        return res.status(400).send({
            error: 'Não foi possível deletar esse projeto'
        });
    }
}