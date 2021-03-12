const {Schema, model} = require('mongoose')

const Orders = new Schema({
    date: {
        type: Schema.Types.Date,
        default: Date.now(),
        required: true
    },
    totalPrice: {
        type: Schema.Types.Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    oldCart: {
        items: [
            {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Items',
                }
            }
        ]
    }
})

module.exports = model('Orders', Orders)