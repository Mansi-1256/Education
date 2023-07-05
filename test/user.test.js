import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';
import { describe, it } from 'mocha';

describe('User API', () => {
    describe('POST /api/users/register', () => {
        it('should register a new user and return status 201', (done) => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            };

            request(app)
                .post('/api/users/register')
                .send(userData)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    const { message } = res.body;
                    expect(message).to.equal('Registration successful');
                    done();
                });
        });
    });

    describe('POST /api/users/login', () => {
        it('should login a user and return a valid token', (done) => {
            const credentials = {
                email: 'johndoe@example.com',
                password: 'password123',
            };

            request(app)
                .post('/api/users/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { token } = res.body;
                    expect(token).to.be.a('string');
                    done();
                });
        });
    });

    describe('GET /api/users/profile', () => {
        it('should return the profile of the authenticated user', (done) => {
            const credentials = {
                email: 'johndoe@example.com',
                password: 'password123',
            };

            request(app)
                .post('/api/users/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { token } = res.body;

                    request(app)
                        .get('/api/users/profile')
                        .set('Authorization', `Bearer ${token}`)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            const { user } = res.body;
                            expect(user).to.have.property('email', 'johndoe@example.com');
                            done();
                        });
                });
        });
    });
});
