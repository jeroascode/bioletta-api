exports.validateEnroll = (req) => {
    if (!req.body.username) return { username: "Username parameter is required" }
    if (!req.body.filePath) return { username: "File path parameter is required" }
    return null
}

exports.validateRecognize = (req) => {
    if (!req.body.filePath) return { username: "File path parameter is required" }
    return null
}