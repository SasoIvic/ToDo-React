const groupModel = require('../models/groupModel.js');

/** @description :: Server-side logic for managing groups of tasks */
module.exports = {

    getGroup: function (req, res) {

        groupModel.findOne({_id: req.params.id}).populate('tags')
        .exec(function (err, group) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error when getting group from DB.'
                });
            }
            if (!group) {
                return res.status(404).json({
                    status: -1,
                    data: 'No such group.'
                });
            }
            return res.json({
                status: 0,
                data: group
            });
        });
    },

    getAllGroups: function (req, res) {

        groupModel.find().populate('tags')
        .exec(function (err, groups) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting groups from DB.'
                });
            }
            return res.json({
                status: 0,
                data: groups
            });
        });
    },

    addGroup: function (req, res) { 

        var group = new groupModel({
            name : req.body.name,
            importance : (req.body.importance ? req.body.importance : 0),
            tags : req.body.tags

        });

        group.save(function (err, group) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error saving group in DB.'
                });
            }
            return res.status(201).json(
                {
                    status: 0,
                    data: group
                });
        });
    },

    addTag: function (req, res) {

        groupModel.findOne({_id: req.params.id}, function (err, group) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting group from DB.'
                });
            }
            if (!group) {
                return res.status(404).json({
                    status: -1,
                    data: 'No such group in DB.'
                });
            }

			group.tags.push(req.body.tags);
			
            group.save(function (err, group) {
                if (err) {
                    return res.status(500).json({
                        status: -1,
                        data: 'Error updating group in DB.'
                    });
                }

                return res.json({
                    status: -1,
                    data: group
                });
            });
        });
    },

    editGroup: function (req, res) {

        groupModel.findOne({_id: req.params.id}, function (err, group) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting group from DB.'
                });
            }
            if (!group) {
                return res.status(404).json({
                    status: -1,
                    data: 'No such group in DB.'
                });
            }

            group.name = req.body.name ? req.body.name : group.name;
			group.tags = req.body.tags ? req.body.tags : group.tags;
			
            group.save(function (err, group) {
                if (err) {
                    return res.status(500).json({
                        status: -1,
                        data: 'Error updating group in DB.'
                    });
                }

                return res.json({
                    status: -1,
                    data: group
                });
            });
        });
    },

    deleteGroup: function (req, res) {

        groupModel.findByIdAndRemove(req.params.id, function (err, group) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error when deleting group.'
                });
            }
            return res.status(204).json({
                status: 0,
                data: 'Group ' + req.params.id +  ' deleted.'
            });
        });
    },

};