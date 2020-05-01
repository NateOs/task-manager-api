const mongoose = require('mongoose')//imported mongoose

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,//connected to db,db gets created during connection
    useCreateIndex: true,
    useFindAndModify: false
})
