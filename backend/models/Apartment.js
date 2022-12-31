const mongoose = require('../db/conn')

const { Schema } = mongoose

const Apartment = mongoose.model(
    'Apartment',
    new Schema(
        {
            title: {
                type: String,
                required: true
            },
            image: {
                type: Array,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            local: {
                type: String,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            squareArea: {
                type: Number,
                required: true
            },
            available: {
                type: Boolean
            },
            user: Object,
            renter: Object
        },
        { timestamps: true }
    )
)

module.exports = Apartment