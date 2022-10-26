const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Record = new Schema(
    {
        name: { type: String, required: true },
        date: { type: String, required: true },
        bloodPressure: { type: String, required: false },
        weight: { type: Number, required: false },
        sleepTime: { type: Number, required: false },
        wakeUp: {type: Number, required: false},
        wakeTime: { type: Number, required: false },
        medicine: { type: String, required: false },
        temp: {type: Number, required: false},
        bath: {type: Number, required: false},
    },
    { timestamps: true },
)

module.exports = mongoose.model('records', Record)
