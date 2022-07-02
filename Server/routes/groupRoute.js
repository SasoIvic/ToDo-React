const express = require('express');
const controller = require('../controllers/groupController.js');

const router = express.Router();

router.get('/getGroup/:id', controller.getGroup);
router.get('/getAllGroups', controller.getAllGroups);

router.post('/addGroup', controller.addGroup);

router.put('/addTag/:id', controller.addTag);
router.put('/editGroup/:id', controller.editGroup);
router.delete('/deleteGroup/:id', controller.deleteGroup);

module.exports = router;