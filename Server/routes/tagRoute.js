const express = require('express');
const controller = require('../controllers/tagController.js');

const router = express.Router();

router.get('/getTag/:id', controller.getTag);
router.get('/getAllTags', controller.getAllTags);

router.post('/addTag', controller.addTag);

router.put('/editTag/:id', controller.editTag);
router.delete('/deleteTag/:id', controller.deleteTag);

module.exports = router;