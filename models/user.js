const mongoose = require('mongoose')

const userSchemas = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            minlength: 8,
            maxlength: 20,
        },
        password: {
            type: String, 
            required: true,
            minlength: 8,
        },
    },{timestamps: true}
)
module.exports = mongoose.model("User",userSchemas);