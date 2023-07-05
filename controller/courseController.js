import asyncHandler from 'express-async-handler'
import Course from '../models/course.js';
import redisClient from '../config/redis.js';

export const create = asyncHandler(async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    const instructorId = req.user.id;
    console.log(instructorId)
    const course = await Course.create({
        title,
        description,
        startDate,
        endDate,
        instructorId,
    });

    res.status(201).json(course);
})

// Get all courses
export const fetchAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Generate a cache key based on the page and limit
    const cacheKey = `courses:${page}:${limit}`;

    // Check if the course list exists in Redis cache
    // const cachedCourses = await redisClient.get(cacheKey);
    // if (cachedCourses) {
    //     // If course list exists in cache, return the cached data
    //     const courses = JSON.parse(cachedCourses);
    //     return res.json(courses);
    // }

    // If course list does not exist in cache, fetch from the database
    const { count, rows: courses } = await Course.findAndCountAll({
        offset,
        limit: Number(limit),
    });

    // Store the course list in Redis cache
    //await redisClient.set(cacheKey, JSON.stringify(courses));

    res.json({
        total: count,
        page,
        limit,
        courses,
    });
});

export const fetch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { page, limit } = req.query;

    const options = {
        where: {},
        offset: 0,
        limit: 10, // Default limit if not provided
    };

    if (id) {
        options.where.id = id;
    }

    if (page && limit) {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        options.offset = offset >= 0 ? offset : 0;
        options.limit = parseInt(limit);
    }


    // const cachedCourse = await redisClient.get(`course:${id}`);
    // if (cachedCourse) {
    //     // If course details exist in cache, return the cached data
    //     const course = JSON.parse(cachedCourse);
    //     return res.json(course);
    // }

    // If course details do not exist in cache, fetch from the database
    const course = await Course.findByPk(id);

    if (!course) {
        res.status(404).json({ message: 'Course not found' });
    } else {
        // Store the course details in Redis cache
        //await redisClient.set(`course:${id}`, JSON.stringify(course));

        res.json(course);
    }
});



export const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, startDate, endDate } = req.body;

    const course = await Course.findByPk(id);

    if (!course) {
        res.status(404).json({ message: 'Course not found' });
    } else {
        course.title = title;
        course.description = description;
        course.startDate = startDate;
        course.endDate = endDate;

        await course.save();

        res.json(course);
    }
});

export const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findByPk(id);

    if (!course) {
        res.status(404).json({ message: 'Course not found' });
    } else {
        await course.destroy();

        res.json({ message: 'Course deleted successfully' });
    }
});


export const getCoursesByInstructor = asyncHandler(async (req, res) => {
    const { id } = req.user; // Assuming instructor id is stored in req.user.id
    const { page = 1, limit = 10 } = req.query;
    const options = {
        where: { instructorId: id },
        offset: (page - 1) * limit,
        limit: +limit,
    };
    const courses = await Course.findAndCountAll(options);
    const totalPages = Math.ceil(courses.count / limit);
    res.json({
        courses: courses.rows,
        currentPage: +page,
        totalPages,
    });
});
