const express = require('express')

const RecordCtrl = require('../controllers/record-ctrl')

const router = express.Router()

router.post('/record', RecordCtrl.createRecord)
router.put('/record/:id', RecordCtrl.updateRecord)
router.delete('/record/:id', RecordCtrl.deleteRecord)
router.get('/record/:id', RecordCtrl.getRecordById)
router.get('/records', RecordCtrl.getRecords)

module.exports = router
