const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.downloadedEnrollUserFilePath = async (url, username) => {
    const folderName = username.toLowerCase()

    const dir = `./data/audios/${folderName}`

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const currentURL = url
    const currentPath = path.resolve('./data/audios', folderName, `${folderName}_voice.wav`)

    await axios({
        method: 'GET',
        url: currentURL,
        responseType: 'stream'
    }).then((res) => {
        res.data.pipe(fs.createWriteStream(currentPath))
        return new Promise((resolve, reject) => {
            res.data.on('end', () => {
                resolve()
            })
            res.data.on('error', err => {
                reject(err)
            })
        })
    }).catch((err) => {
        console.log(err)
        return { data: err, message: 'Error on download user file path', code: 422 }
    })
    return { data: { currentPath }, message: 'User file path downloaded success', code: 200 }
}

exports.downloadedRecognizeUserFilePath = async (url) => {
    const dir = './data/audios/recognize'

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const currentURL = url
    const currentPath = path.resolve('./data/audios', 'recognize', 'recognize_voice.wav')

    await axios({
        method: 'GET',
        url: currentURL,
        responseType: 'stream'
    }).then((res) => {
        res.data.pipe(fs.createWriteStream(currentPath))
        return new Promise((resolve, reject) => {
            res.data.on('end', () => {
                resolve()
            })
            res.data.on('error', err => {
                reject(err)
            })
        })
    }).catch((err) => {
        console.log(err)
        return { data: err, message: 'Error on download user file path', code: 422 }
    })
    return { data: { currentPath }, message: 'User file path downloaded success', code: 200 }
}