const express = require('express');
const controller = require('../controllers/taskController.js');

const router = express.Router();

router.get('/getTask/:id', controller.getTask);
router.get('/getAllTasks/:id', controller.getAllTasks); //vsi taski v grupi
router.get('/topFive', controller.getTopFive);
router.get('/getTasks', controller.getTasks); //čisto vsi taski

router.post('/addTask', controller.addTask);

router.put('/addTag/:id', controller.addTag);
router.put('/editTask/:id', controller.editTask);
router.delete('/deleteTask/:id', controller.deleteTask);

module.exports = router;