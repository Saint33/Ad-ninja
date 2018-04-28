const { User } = require('../models/user');

exports.register = (req, res, next) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if(err) { return next(err) };
        res.status(200).json({
            success: true,
            user: user
        });
    });
};

exports.auth = (req, res, next) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        username: req.user.username
    })
};

exports.login = (req, res, next) => {

    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.status(400).json({isAuth: false, message: 'Auth failed, email not found'});
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.status(400).json({
                isAuth: false, 
                message: 'Wrong password'
            });

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email,
                    username: user.username
                });
            });
        });    
    });
};

exports.logout = (req, res, next) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
};