import asyncHandler from 'express-async-handler';
import Enrollment from '../models/enrollment.js';

// Fetch all enrollments
export const getEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments);
});

// Fetch single enrollment
export const getEnrollmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
        res.json(enrollment);
    } else {
        res.status(404).json({ message: 'Enrollment not found' });
    }
});

// Create a new enrollment
export const createEnrollment = asyncHandler(async (req, res) => {
    const { courseId, userId, instructorId, grade } = req.body;
    const enrollment = await Enrollment.create({ courseId, userId, instructorId, grade });
    res.status(201).json(enrollment);
});

// Update an enrollment
export const updateEnrollment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { courseId, userId, instructorId, grade } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
        await enrollment.update({ courseId, userId, instructorId, grade });
        res.json(enrollment);
    } else {
        res.status(404).json({ message: 'Enrollment not found' });
    }
});

// Delete an enrollment
export const deleteEnrollment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
        await enrollment.destroy();
        res.json({ message: 'Enrollment removed' });
    } else {
        res.status(404).json({ message: 'Enrollment not found' });
    }
});

export const getEnrollmentsByInstructor = asyncHandler(async (req, res) => {
    console.log('das')
    const { id } = req.user; // Assuming user id is stored in req.user.id
    console.log('d', id)
    const enrollments = await Enrollment.findAll({ where: { instructorId: id } });
    res.json(enrollments);
});

// Fetch enrollments by user
export const getEnrollmentsByUser = asyncHandler(async (req, res) => {
    const { id } = req.user; // Assuming user id is stored in req.user.id
    const enrollments = await Enrollment.findAll({ where: { userId: id } });
    res.json(enrollments);
});