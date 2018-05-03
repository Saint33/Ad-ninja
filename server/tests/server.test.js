const request = require('supertest');
const cookieParser = require('cookie-parser');

const { app } = require ('../index');
const { Ad } = require('../models/ad');
const { User } = require('../models/user');

const user1 = {
    "firstname": "Igor",
    "lastname": "Mayami",
    "username": "saint",
    "email": "mail32@mail.ru",
    "password": "123121"
}

describe('POST /api/auth/register', () => {

    test('It should create a new user', (done) => {
        request(app)
            .post('/api/auth/register')
            .send(user1)
            .set('Content-Type', 'application/json').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test('It should login user and create auth token', (done) => {
        request(app)
            .post('/api/auth/login')
            .send({email: user1.email, password: user1.password})
            .set('Content-Type', 'application/json').then((response) => {

            expect(response.statusCode).toBe(200);
            expect(response.headers['set-cookie'][0]).toBe('auth=eyJhbGciOiJIUzI1NiJ9.NWFlOThkMTBiOWIzZGIyOTU4NjIwNDgx.Lp-_BLN77Kz73I1zyJlk6tR0ZcavoQQDLC_6PnQOZ6s; Path=/')
            done();
        });
    });



});