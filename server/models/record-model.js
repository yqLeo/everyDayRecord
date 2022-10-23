const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Record = new Schema(
    {
        name: { type: String, required: true },
        date: { type: String, required: true },
        bloodPressure: { type: Number, required: false },
        weight: { type: Number, required: false },
        condition: { type: String, required: false },
        healthRecord: { type: String, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('records', Record)
