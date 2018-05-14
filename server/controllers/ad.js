const { Ad } = require('../models/ad');

exports.newAd = (req, res, next) => {
    const ad = new Ad(req.body);
    
    ad.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            AdId: doc._id
        });
    });
};

exports.getAd = (req, res, next) => {
    let id = req.query.id;
    Ad.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
};

exports.getUserAds = (req, res, next) => {
    let userId = req.query.id;
    Ad.find({"ownerId": userId}, (err, docs) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            docs
        });
    });
}

exports.getAds = (req, res, next) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Ad.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
}

exports.deleteAd = (req, res, next) => {
    let id = req.query.id;
    Ad.findByIdAndRemove(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json({success: true, id});
    });
};

exports.updateAd = (req, res, next) => {
    Ad.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
}

exports.findAd = (req, res, next) => {
    let query = req.query.query;

    Ad.find({$text:{ $search:`"\"${query}\""`}}).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
};