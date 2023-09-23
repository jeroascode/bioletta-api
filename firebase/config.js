const { initializeApp } = require('firebase/app')
const { getStorage, ref, getDownloadURL } = require('firebase/storage')

const firebaseConfig = {
    apiKey: "AIzaSyChUxMmy1CfyYRIDPkSS4nPL2d_DnwK2xU",
    authDomain: "proyecto-bioletta.firebaseapp.com",
    projectId: "proyecto-bioletta",
    storageBucket: "proyecto-bioletta.appspot.com",
    messagingSenderId: "324494865820",
    appId: "1:324494865820:web:e47ec85dd9220b48014459"
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const getURLBiometricVoiceAudio = async (path) => {
    const storageRef = ref(storage, path)
    return await getDownloadURL(storageRef).then((res) => {
        return { data: { url: res }, message: 'Ok', code: 200 }
    }).catch((err) => {
        const error = err.status_;
        console.error(error)
        return { data: { error }, message: 'Error in get url biometric voice audio', code: 422 }
    });
}

module.exports = { getURLBiometricVoiceAudio }