const express = require('express');
const { auth } = require('./middleware/auth');
const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const AdController = require('./controllers/ad');

module.exports = function(app){
    const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    adRoutes = express.Router()

    //= ========================
    // Auth Routes
    //= ========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);
    // Authentication route
    authRoutes.get('/auth', auth, AuthenticationController.auth);
    // Login route
    authRoutes.post('/login', AuthenticationController.login);
    // Logout route
    authRoutes.get('/logout', AuthenticationController.logout);
    
    //= ========================
    // User Routes
    //= ========================

    // Set user routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/user', userRoutes);

    userRoutes.get('/:id', UserController.getUser);
    userRoutes.get('/users', UserController.getUsers);
    userRoutes.get('/info', UserController.getUserInfo);


    //= ========================
    // Ad Routes
    //= ========================

    // Set user routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/ad', adRoutes);

    adRoutes.post('/', AdController.newAd);
    adRoutes.get('/', AdController.getAd);
    adRoutes.get('/ads', AdController.getAds);
    adRoutes.delete('/', AdController.deleteAd);

    app.use('/api', apiRoutes);

}
