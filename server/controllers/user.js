const { User } = require('../models/user');

exports.getUser = (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, user) => {
        if(err) return res.status(400).send(err);
        res.send(user);
    })
};

exports.getUsers = (req, res, next) => {
    User.find({}, (err, user) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(user);
    });
};

exports.getUserInfo = (req, res, next) => {
    let id = req.query.id;

    User.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send({
            username: doc.username,
            id: doc._id
        });
    });
};