const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/ProjectMiddlewares/auth');
const router = express.Router();


router.use(authMiddleware);

router.delete('/:projectId', (req, res) => {
    projectController.deleteProject(req, res);
});

router.post('/projectAdd', (req, res) => {
    projectController.addProject(req, res);
});

router.get('/', (req, res) => {
    projectController.loadProjects(req, res);
});

router.get('/:projectId', (req, res) => {
    projectController.loadOneProject(req, res);
});

router.put('/:projectId', (req, res) => {
    projectController.updateProject(req, res);
});

router.put('/complete/:projectId', (req, res) => {
    projectController.endProject(req, res);
});


module.exports = app => app.use("/projects", router);