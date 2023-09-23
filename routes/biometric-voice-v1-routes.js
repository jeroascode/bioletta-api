const api = require('express').Router()

const BiometricVoiceController = require('../controllers/BiometricVoiceController')

const fileValidation = require('../helpers/FileValidation')

api.post('/enroll', async (req, res) => {
    const errors = fileValidation.validateEnroll(req)
    if (errors) return res.status(422).send({ result: { errors } })
    const resp = await BiometricVoiceController.sendEnroll(req)
    if (resp.code >= 400) console.error('Error in enroll: ', { result: resp.message })
    return res.status(resp.code).send({ result: resp })
})

api.post('/recognize', async (req, res) => {
    const errors = fileValidation.validateRecognize(req)
    if (errors) return res.status(422).send({ result: { errors } })
    const resp = await BiometricVoiceController.sendRecognize(req)
    if (resp.code >= 400) console.error('Error in enroll: ', { result: resp.message })
    return res.status(resp.code).send({ result: resp })
})

module.exports = api