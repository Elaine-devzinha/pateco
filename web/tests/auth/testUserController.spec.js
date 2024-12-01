// describe -> block tests
// it or test -> declare uico teste uitario - tests -cases
// expect -> espera um resultado - > validar resultados

const request = require('supertest')
const app = require('../../app')

describe('Initial Tests', () => {
    it("List users", () => {
        return request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200).then((res) => {
                expect(res.statusCode).toBe(200)
            })
    })
})