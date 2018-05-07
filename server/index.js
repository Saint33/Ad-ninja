const express = require('express'),
    app = express(),
    router = require('./router'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config').get(process.env.NODE_ENV),
    socketEvents = require('./socketEvents'),
    http = require('http').createServer(app),
    GridFsStorage = require('multer-gridfs-storage'),
    Grid = require('gridfs-stream')
    multer = require('multer'),
    ObjectId = mongoose.Types.ObjectId;

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

var conn = mongoose.connection;
let gfs;
conn.once('open', () => {

    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

    
});

const { Ad } = require('./models/ad');

const storage = new GridFsStorage({
    url: config.DATABASE,
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    },
    /** With gridfs we can store aditional meta-data along with the file */
    metadata: function(req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'fs' //root name for collection to store files into
});

const upload = multer({ //multer settings for single upload
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/api/upload', function(req, res) {
    upload(req,res,function(err){
        Ad.update({"_id": ObjectId(req.body.id)},{"$set":{"image":req.file.filename}},{upsert: true}).exec((err, docs) => {
            if(err) return console.log(err);
            console.log(docs);
        });
        // Ad.findOneAndUpdate({"_id": req.body.id}, {$set:{"imageId":req.file.filename}},{upsert: true}).exec((err, docs) => {
        //     if(err) return console.log(err)
        //     console.log(docs)
        // })
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        console.log(req.body.id, req.file.filename);
        res.json({error_code:0,err_desc:null});
    });
});

app.get('/api/file/:filename', function(req, res){
    gfs.collection('fs'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "fs"
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType)
        /** return response */
        return readstream.pipe(res);
    });
});

app.use(express.static('client/build'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

// if(process.env.NODE_ENV === 'production'){
//     const path = require('path');
//     app.get('/*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
//     })
// }

const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

router(app);

module.exports = { app };