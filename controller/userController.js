import asyncHandler from 'express-async-handler';
import MESSAGE from '../constant/message.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken'
// Login user
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && (await user.confirmPassword(password))) {
        const jwtSecret = process.env.JWT_SECRET
        const token = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: '30d',
        })

        res.json({ message: MESSAGE.LOGIN_SUCCESS, token });
    } else {
        res.status(401);
        throw new Error(MESSAGE.LOGIN_ERROR);
    }
});

// Register user
export const register = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, password, userType } = req.body;
    const user = await User.create({ firstName, lastName, email, password, userType });

    if (user) {
        res.status(201).json({ message: MESSAGE.REGISTER_SUCCESS });
    } else {
        res.status(400);
        throw new Error(MESSAGE.REGISTER_ERROR);
    }
});

// Get user profile
export const getProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    res.json({ user });
});

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    const { firstName, lastName, email } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();

    res.json({ message: MESSAGE.PROFILE_UPDATE_SUCCESS, user });
});
