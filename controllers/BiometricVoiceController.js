const { PythonShell } = require('python-shell')

const pathResponse = require('../utils/pathResponse')

exports.sendEnroll = async (req) => {
    const { username, filePath } = req.body
    const currentPath = await pathResponse.enrollPathResponse(filePath, username)
    if (currentPath.code >= 400) return { message: currentPath.message, code: currentPath.code }
    let options = { args: ['enroll', currentPath.data.path, username] }
    return await PythonShell.run('voice_auth.py', options).then((res) => {
        const resMessage = res[3]
        if (resMessage >= 400) return { message: 'Unable to enroll the user, check the file format, only WAV and FLAC files allowed', code: 400 }
        return { data: { username, enrolled: "true" }, message: 'Biometric Voice enroll completed successfully', code: 200 }
    }).catch((err) => {
        console.log(err)
        return { message: `Error in Biometric Voice enroll: ${err}`, code: 422 }
    })
}

exports.sendRecognize = async (req) => {
    const { filePath } = req.body;
    const currentPath = await pathResponse.recognizePathResponse(filePath)
    if (currentPath.code >= 400) return { message: currentPath.message, code: currentPath.code }
    let options = { args: ['recognize', currentPath.data.path] }
    return await PythonShell.run('voice_auth.py', options).then((res) => {
        const resMessage = res[3]
        if (resMessage >= 400) return { message: 'Unable to enroll the user, check the file format, only WAV and FLAC files allowed', code: 400 }
        const username = res[5]
        if (!username) return { data: { recognize: 'false' }, message: 'Biometric Voice recognize not found', code: 404 }
        return { data: { userRecognize: username, recognize: 'true' }, message: 'Biometric Voice recognize completed successfully', code: 200 }
    }).catch((err) => {
        console.log(err);
        return { message: `Error in Biometric Voice recognize: ${err}`, code: 422 }
    })
}