import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getEnrollmentsByInstructor,
    getEnrollmentsByUser,
} from '../controller/enrollment.js';

const router = express.Router();
// Middleware to protect the routes below
router.use(protect)
router.get('/user', getEnrollmentsByUser);
router.get('/instructor', getEnrollmentsByInstructor);
router.get('/', getEnrollments);
router.get('/:id', getEnrollmentById);
router.post('/', createEnrollment);
router.put('/:id', updateEnrollment);
router.delete('/:id', deleteEnrollment);


export default router;
