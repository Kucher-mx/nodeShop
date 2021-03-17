const {Schema, model} = require('mongoose')

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart : {
        items: [
            {
                count: {
                    type: Number,
                    default: 1
                },
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Items'
                }
            }
        ] 
    },
    liked: {
        items: [
            {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Items'
                }
            }
        ]
    }
})

module.exports = model('User', User)