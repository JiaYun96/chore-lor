const mongoose = require('mongoose')

const ChoresSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    
    chorename: {
        type: String,
        required: true
    },
    
    housearea: {
        type: String,
        required: true
    },

    starttime: {
        type: Date,
        required: true
    },

    endtime: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        required: true
    },
    
    comments: {
        type: String,
        required: true
    
    },

})

const ChoresModel = mongoose.model('chores', ChoresSchema)

module.exports = {
    ChoresModel: ChoresModel
}

