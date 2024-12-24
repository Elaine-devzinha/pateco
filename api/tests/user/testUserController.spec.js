// describe -> block tests
// it or test -> declare uico teste uitario - tests -cases
// expect -> espera um resultado - > validar resultados

const request = require('supertest')
const app = require('../../app')
const random = Math.floor(Math.random() * 1000)
const testUser = {
    ct_email: `danilo${random}@baratao.com.br`,
    pw_usuario: '123456'
}
let token


describe('Initial Tests', () => {
    it("Create User", () => {
        return request(app)
            .post('/user')
            .send(testUser)
            .expect('Content-Type', /json/)
            .expect(201)
    })
    it("Login", () => {
        return request(app)
            .get('/auth/login')
            .set('ct_email', testUser.ct_email)
            .set('pw_usuario', testUser.pw_usuario)
            .expect('Content-Type', /json/)
            .expect(200).then((res) => {
                token = res.body.token
            }
        )
    })

    it("List users", () => {
        return request(app)
            .get('/users')
            .set('authorization', `${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    })
})