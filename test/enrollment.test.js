import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import { describe, it } from 'mocha';

describe('Enrollment API', () => {
    describe('POST /api/enrollments', () => {
        it('should enroll a user in a course and return status 201', (done) => {
            const enrollmentData = {
                courseId: 1, // Provide an existing course ID from your database
                grade: 'A',
            };

            request(app)
                .post('/api/enrollments')
                .send(enrollmentData)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    const { message } = res.body;
                    expect(message).to.equal('Enrollment created successfully');
                    done();
                });
        });
    });

    describe('GET /api/enrollments/:id', () => {
        it('should get an enrollment by ID and return status 200', (done) => {
            const enrollmentId = 1; // Provide an existing enrollment ID from your database

            request(app)
                .get(`/api/enrollments/${enrollmentId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { enrollment } = res.body;
                    expect(enrollment).to.have.property('grade', 'A');
                    done();
                });
        });

        it('should return status 404 if enrollment ID does not exist', (done) => {
            const enrollmentId = 999; // Provide a non-existing enrollment ID

            request(app)
                .get(`/api/enrollments/${enrollmentId}`)
                .expect(404, done);
        });
    });

    describe('PUT /api/enrollments/:id', () => {
        it('should update an enrollment by ID and return status 200', (done) => {
            const enrollmentId = 1; // Provide an existing enrollment ID from your database
            const updatedData = {
                grade: 'B',
            };

            request(app)
                .put(`/api/enrollments/${enrollmentId}`)
                .send(updatedData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { message } = res.body;
                    expect(message).to.equal('Enrollment updated successfully');
                    done();
                });
        });

        it('should return status 404 if enrollment ID does not exist', (done) => {
            const enrollmentId = 999; // Provide a non-existing enrollment ID
            const updatedData = {
                grade: 'B',
            };

            request(app)
                .put(`/api/enrollments/${enrollmentId}`)
                .send(updatedData)
                .expect(404, done);
        });
    });

    describe('DELETE /api/enrollments/:id', () => {
        it('should delete an enrollment by ID and return status 200', (done) => {
            const enrollmentId = 1; // Provide an existing enrollment ID from your database

            request(app)
                .delete(`/api/enrollments/${enrollmentId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { message } = res.body;
                    expect(message).to.equal('Enrollment deleted successfully');
                    done();
                });
        });

        it('should return status 404 if enrollment ID does not exist', (done) => {
            const enrollmentId = 999; // Provide a non-existing enrollment ID

            request(app)
                .delete(`/api/enrollments/${enrollmentId}`)
                .expect(404, done);
        });
    });
});
