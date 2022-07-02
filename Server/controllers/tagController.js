const tagModel = require('../models/tagModel.js');

/** @description :: Server-side logic for managing tags */
module.exports = {

    getTag: function (req, res) {

        tagModel.findOne({_id: req.params.id})
        .exec(function (err, tag) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error when getting tag from DB.'
                });
            }
            if (!tag) {
                return res.status(404).json({
                    status: -1,
                    data: 'No such tag.'
                });
            }
            return res.json({
                status: 0,
                data: tag
            });
        });
    },

    // Za spustni seznam tagov
    getAllTags: function (req, res) {

        tagModel.find()
        .exec(function (err, tags) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting tags from DB.'
                });
            }
            return res.json({
                status: 0,
                data: tags
            });
        });
    },

    // Za dodajanje lastnih tagov
    addTag: function (req, res) {

        var tag = new tagModel({
            name : req.body.name,
            color : req.body.color

        });

        tag.save(function (err, tag) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error saving tag in DB.'
                });
            }
            return res.status(201).json(
            {
                status: 0,
                data: tag
            });
        });
    },

    // Za spreminjanje barve za določen tag
    editTag: function (req, res) {

        tagModel.findOne({_id: req.params.id}, function (err, tag) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    data: 'Error getting tag from DB.'
                });
            }
            if (!tag) {
                return res.status(404).json({
                    status: -1,
                    data: 'No such tag in DB.'
                });
            }

            tag.color = req.body.color ? req.body.color : tag.color;
			
            tag.save(function (err, tag) {
                if (err) {
                    return res.status(500).json({
                        status: -1,
                        data: 'Error updating tag in DB.'
                    });
                }

                return res.json({
                    status: -1,
                    data: tag
                });
            });
        });
    },

    deleteTag: function (req, res) {
        try {
            tagModel.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    return res.status(500).json({
                        status: -1,
                        data: 'Error when deleting tag.'
                    });
                }
                return res.status(204).json({
                    status: 0,
                    data: 'Tag ' + req.params.id +  ' deleted.'
                });
            });
        }
        catch (err) {
            res.json({
                message: err
            })
        }
    },

};
