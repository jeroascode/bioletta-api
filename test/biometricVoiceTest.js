let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../biometric-voice-service');

let { describe, it } = require('node:test');
let { expect } = require('chai')

chai.use(chaiHttp)

describe('Send enroll', () => {
    it('Do user registration success', (done) => {
        const user = {
            username: 'Cristiano Ronaldo',
            filePath: 'bioletta/Cristiano Ronaldo/final_record.wav'
        }
        chai.request(server)
            .post('/biometric/v1/voice/enroll')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            })
    })
})

describe('Send enroll', () => {
    it('Do user registration not success', (done) => {
        const user = {
            username: 'Cristiano Ronaldo',
            filePath: 'bioletta/Cristiano Ronaldo/final_record.wava'
        }
        chai.request(server)
            .post('/biometric/v1/voice/enroll')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.not.status(200)
                done();
            })
    })
})

describe('Send recognize', () => {
    it('Do user registration success', (done) => {
        const user = {
            filePath: 'bioletta/Cristiano Ronaldo/final_record.wav'
        }
        chai.request(server)
            .post('/biometric/v1/voice/recognize')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            })
    })
})

describe('Send recognize', () => {
    it('Do user registration not success', (done) => {
        const user = {
            filePath: 'bioletta/Cristiano Ronaldo/final_record.wava'
        }
        chai.request(server)
            .post('/biometric/v1/voice/recognize')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.not.status(200)
                done();
            })
    })
})