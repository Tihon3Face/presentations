const {Schema, model, Types} = require('mongoose')


const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', User)