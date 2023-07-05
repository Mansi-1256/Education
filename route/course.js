import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { create, fetchAll, getCoursesByInstructor, remove, update, fetch } from '../controller/courseController.js';

const router = express.Router();
router.use(protect); // Middleware to protect the routes below
router.post('/', create);
router.get('/instructor', getCoursesByInstructor);
router.get('/', fetchAll);
router.get('/:id', fetch);
router.put('/:id', update);
router.delete('/:id', remove);


export default router;
