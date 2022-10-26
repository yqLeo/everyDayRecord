const Record = require('../models/record-model')

createRecord = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a record',
        })
    }

    const record = new Record(body)

    if (!record) {
        return res.status(400).json({ success: false, error: err })
    }

    record
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: record._id,
                message: 'Record created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Record not created!',
            })
        })
}

updateRecord = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Record.findOne({ _id: req.params.id }, (err, record) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Record not found!',
            })
        }
        record.name = body.name
        record.date = body.date
        record.bloodPressure = body.bloodPressure
        record.weight = body.weight
        record.sleepTime = body.sleepTime
        record.wakeUp = body.wakeUp
        record.wakeTime = body.wakeTime
        record.medicine = body.medicine
        record.temp = body.temp
        record.bath = body.bath
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: record._id,
                    message: 'Record updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Record not updated!',
                })
            })
    })
}

deleteRecord = async (req, res) => {
    await Record.findOneAndDelete({ _id: req.params.id }, (err, record) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!record) {
            return res
                .status(404)
                .json({ success: false, error: `Record not found` })
        }

        return res.status(200).json({ success: true, data: record })
    }).catch(err => console.log(err))
}

getRecordById = async (req, res) => {
    await Record.findOne({ _id: req.params.id }, (err, record) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: record })
    }).catch(err => console.log(err))
}

getRecords = async (req, res) => {
    await Record.find({}, (err, records) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!records.length) {
            return res
                .status(404)
                .json({ success: false, error: `Record not found` })
        }
        return res.status(200).json({ success: true, data: records })
    }).catch(err => console.log(err))
}

module.exports = {
    createRecord,
    updateRecord,
    deleteRecord,
    getRecords,
    getRecordById,
}
