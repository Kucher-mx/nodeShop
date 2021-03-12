const {Schema, model} = require('mongoose')

const Items = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    descr: {
        type: Schema.Types.String,
        required: true
    },
    category: {
        type: Schema.Types.String,
        required: true
    },
    images: {
        type: Schema.Types.String,
        required: true
    },
    sale: {
        type: Schema.Types.Number
    },
    quantity: {
        type: Schema.Types.Number,
        required: true
    },
    color: {
        colors: [
            {
                colorName: {
                    type: Schema.Types.String,
                }
            }
        ]
    },
    model: {
        models: [
            {
                modelName: {
                    type: Schema.Types.String,
                }
            }
        ]
    }
})

module.exports = model('Items', Items)