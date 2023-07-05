import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { describe, it } from 'mocha';

describe('Course API', () => {
    describe('POST /api/courses', () => {
        it('should create a new course and return status 201', (done) => {
            const courseData = {
                title: 'JavaScript Basics',
                description: 'Learn the fundamentals of JavaScript',
                instructor: 'John Doe',
            };

            request(app)
                .post('/api/courses')
                .send(courseData)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    const { message } = res.body;
                    expect(message).to.equal('Course created successfully');
                    done();
                });
        });
    });

    describe('GET /api/courses/:id', () => {
        it('should get a course by ID and return status 200', (done) => {
            const courseId = 1; // Provide an existing course ID from your database

            request(app)
                .get(`/api/courses/${courseId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { course } = res.body;
                    expect(course).to.have.property('title', 'JavaScript Basics');
                    done();
                });
        });

        it('should return status 404 if course ID does not exist', (done) => {
            const courseId = 999; // Provide a non-existing course ID

            request(app)
                .get(`/api/courses/${courseId}`)
                .expect(404, done);
        });
    });

    describe('PUT /api/courses/:id', () => {
        it('should update a course by ID and return status 200', (done) => {
            const courseId = 1; // Provide an existing course ID from your database
            const updatedData = {
                title: 'Advanced JavaScript',
                description: 'Learn advanced JavaScript concepts',
                instructor: 'John Doe',
            };

            request(app)
                .put(`/api/courses/${courseId}`)
                .send(updatedData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { message } = res.body;
                    expect(message).to.equal('Course updated successfully');
                    done();
                });
        });

        it('should return status 404 if course ID does not exist', (done) => {
            const courseId = 999; // Provide a non-existing course ID
            const updatedData = {
                title: 'Advanced JavaScript',
                description: 'Learn advanced JavaScript concepts',
                instructor: 'John Doe',
            };

            request(app)
                .put(`/api/courses/${courseId}`)
                .send(updatedData)
                .expect(404, done);
        });
    });

    describe('DELETE /api/courses/:id', () => {
        it('should delete a course by ID and return status 200', (done) => {
            const courseId = 1; // Provide an existing course ID from your database

            request(app)
                .delete(`/api/courses/${courseId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const { message } = res.body;
                    expect(message).to.equal('Course deleted successfully');
                    done();
                });
        });

        it('should return status 404 if course ID does not exist', (done) => {
            const courseId = 999; // Provide a non-existing course ID

            request(app)
                .delete(`/api/courses/${courseId}`)
                .expect(404, done);
        });
    });
});
