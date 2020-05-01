const mongoose = require('mongoose')//imported mongoose

//task model
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
        },
        completed: {
        type: Boolean,
        default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
},{
    timestamps: true
})

// const taskSchema = {
//     description: {
//     type: String,
//     required: true,
//     trim: true
//     },
//     completed: {
//     type: Boolean,
//     default: false
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//     }
// }
    

const Task = mongoose.model('Task', taskSchema)

module.exports = Task