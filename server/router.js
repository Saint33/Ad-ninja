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
    authRoutes.get('/', auth, AuthenticationController.auth);
    // Login route
    authRoutes.post('/login', AuthenticationController.login);
    // Logout route
    authRoutes.get('/logout', auth, AuthenticationController.logout);
    
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
    adRoutes.get('/vip', AdController.getVIPAds);
    adRoutes.delete('/', AdController.deleteAd);
    adRoutes.get('/user-ads', AdController.getUserAds);
    adRoutes.get('/find', AdController.findAd);
    adRoutes.post('/add-to-favorites', AdController.addToFavorites)
    adRoutes.post('/delete-from-favorites', AdController.deleteFromFavorites)
    app.use('/api', apiRoutes);

}
