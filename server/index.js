const express = require('express'),
    app = express(),
    router = require('./router'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config').get(process.env.NODE_ENV),
    socketEvents = require('./socketEvents'),
    http = require('http').createServer(app);
    
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

router(app);