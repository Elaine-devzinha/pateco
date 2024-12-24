// describe -> block tests
// it or test -> declare uico teste uitario - tests -cases
// expect -> espera um resultado - > validar resultados

const request = require('supertest')
const app = require('../../app')
const random = () => {return Math.floor(Math.random() * 1000)}
const testUser = {
    nm_usuario:'danilo',
    ct_email: `danilo${random()}@baratao.com.br`,
    pw_usuario: '123456'
}
let group
let token


describe('Initial Tests', () => {
    it("Create User", () => {
        return request(app)
            .post('/user')
            .send(testUser)
            .expect('Content-Type', /json/)
            .expect(201).then(res => {
                testUser.id = res.body.id
            })
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

    it("List Groups", () => {
        return request(app)
            .get('/groups')
            .set('authorization', `${token}`)
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                group = res.body
                console.log(res.body)
            })
    })
    it("Show Group", () => {
        return request(app)
            .get('/group/'+group[0].id)
            .set('authorization', `${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    })
    
})