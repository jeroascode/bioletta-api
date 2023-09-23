const storage = require('../firebase/config')

const fileManager = require('../utils/FileManager')

exports.enrollPathResponse = async (filePath, username) => {
    const responseURL = await storage.getURLBiometricVoiceAudio(filePath)
    if (responseURL.data.error <= 0) return { message: 'Audio file path not found', code: 404 }
    const enrollPath = await fileManager.downloadedEnrollUserFilePath(responseURL.data.url, username)
    if (!enrollPath) return { message: 'Audio file not found', code: 404 }
    return { data: { path: enrollPath.data.currentPath }, message: 'Get path success', code: 200 }
}

exports.recognizePathResponse = async (filePath) => {
    const responseURL = await storage.getURLBiometricVoiceAudio(filePath)
    if (responseURL.data.error <= 0) return { message: 'Audio file path not found', code: 404 }
    const enrollPath = await fileManager.downloadedRecognizeUserFilePath(responseURL.data.url)
    if (!enrollPath) return { message: 'Audio file not found', code: 404 }
    return { data: { path: enrollPath.data.currentPath }, message: 'Get path success', code: 200 }
}