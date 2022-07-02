const taskModel = require('../models/taskModel.js');

/** @description :: Server-side logic for managing tasks */
module.exports = {

    getTask: function (req, res) {

        taskModel.findOne({_id: req.params.id})
        .populate('tags')
        .exec(function (err, task) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    body: 'Error when getting task from DB.'
                });
            }
            if (!task) {
                return res.status(404).json({
                    status: -1,
                    body: 'No such task.'
                });
            }
            return res.json({
                status: 0,
                body: task
            });
        });
    },

    //vsi taski v neki grupi
    getAllTasks: function (req, res) {

        taskModel.find({groupId:req.params.id})
        .sort({isCompleted: 1, endDate: 1})
        .populate('tags')
        .exec(function (err, tasks) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting tasks from DB.'
                });
            }
            return res.json({
                status: 0,
                data: tasks
            });
        });
    },

    getTasks: function (req, res) {

        taskModel.find({isCompleted: !true}).populate('tags')
        .sort({endDate: 1})
        .exec(function (err, tasks) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting tasks from DB.'
                });
            }
            return res.json({
                status: 0,
                data: tasks
            });
        });
    },

    getTopFive: function (req, res) {

        taskModel.find({endDate: {$exists: true}, isCompleted: !true}).populate('tags')
        .sort({endDate: 1})
        .limit(5)
        .exec(function (err, tasks) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting tasks from DB.'
                });
            }
            return res.json({
                status: 0,
                data: tasks
            });
        });
    },
    
    addTask: function (req, res) { 

        var task = new taskModel({
            groupId : req.body.task.groupId,
            title : req.body.task.title,
            description : req.body.task.description,
            endDate : req.body.task.endDate,
            reminderOffset : req.body.task.reminderOffset,
            isCompleted : req.body.task.isCompleted,
            tags : req.body.task.tags

        });

        task.save(function (err, task) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error saving task in DB.'
                });
            }
            return res.status(201).json(
                {
                    status: 0,
                    data: task
                });
        });

    },

    addTag: function (req, res) {

    taskModel.findOne({_id: req.params.id}, function (err, task) {
        if (err) {
            return res.status(500).json({
                status: -1,
                data: 'Error getting task from DB.'
            });
        }
        if (!task) {
            return res.status(404).json({
                status: -1,
                data: 'No such task in DB.'
            });
        }

        task.tags.push(req.body.tags);
        
        task.save(function (err, task) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error updating task in DB.'
                });
            }

            return res.json({
                status: -1,
                data: task
            });
        });
    });
    },

    editTask: function (req, res) {

        taskModel.findOne({_id: req.params.id}, function (err, task) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting task from DB.'
                });
            }
            if (!task) {
                return res.status(404).json({
                    status: -1,
                    data: 'No such task in DB.'
                });
            }

            task.groupId = req.body.task.groupId ? req.body.task.groupId : task.groupId;
            task.title = req.body.task.title ? req.body.task.title : task.title;
            task.description = req.body.task.description ? req.body.task.description : task.description;
            task.endDate = req.body.task.endDate ? req.body.task.endDate : task.endDate;
            task.reminderOffset = req.body.task.reminderOffset ? req.body.task.reminderOffset : task.reminderOffset;
            task.isCompleted = (req.body.task.isCompleted != null && req.body.task.isCompleted != undefined) ? req.body.task.isCompleted : task.isCompleted;

            //Pošljejo se vsi tagi vsebovani na tasku (v JSON formatu)
            task.tags = req.body.task.tags ? req.body.task.tags : task.tags;
			
            task.save(function (err, task) {
                if (err) {
                    return res.status(500).json({
                        status: -1,
                        data: 'Error updating task in DB.'
                    });
                }

                return res.json({
                    status: -1,
                    data: task
                });
            });
        });
    },

    deleteTask: function (req, res) {

        taskModel.findByIdAndRemove(req.params.id, function (err, task) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error when deleting task.'
                });
            }
            return res.status(204).json({
                status: 0,
                data: 'Task ' + req.params.id +  ' deleted.'
            });
        });
    },

};
