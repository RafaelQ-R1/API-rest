const express = require('express');
const TaskController = require('../controllers/TasksController');
const router = express.Router();

router.put('/completetask/:taskId', (req, res) => {

    TaskController.completeTask(req, res);
});

router.get('/', (req, res) => {

    TaskController.showTasks(req, res);
});


router.get('/:taskId', (req, res) => {

    TaskController.showOneTask(req, res);
});



module.exports = app => app.use("/tasks", router);