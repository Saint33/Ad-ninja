const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'DASdsaj:LKDSASDADSA',
        DATABASE: 'mongodb://localhost:27017/Add-ninja'
    }
}

exports.get = function(env){
    return config[env] || config.default;
}