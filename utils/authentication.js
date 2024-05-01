const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret, jwtExpiration } = require('../config'); // Assuming you have a config file containing JWT secret and expiration time
const User = require('../models/User');

const generateToken = (userId) => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiration });
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = generateToken(user.id);
        return token;
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
};

const protectRoute = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decodedToken = verifyToken(token);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const registerUser = async (userData) => {
    try {
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await User.create({ email: userData.email, password: hashedPassword });
        return newUser;
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
};

const updateUserPassword = async (userId, newPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.update({ password: hashedPassword }, { where: { id: userId } });
    } catch (error) {
        throw new Error(`Error updating user password: ${error.message}`);
    }
};

const deleteUser = async (userId) => {
    try {
        await User.destroy({ where: { id: userId } });
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

module.exports = {
    generateToken,
    verifyToken,
    authenticateUser,
    protectRoute,
    registerUser,
    updateUserPassword,
    deleteUser,
    getUserById,
    getUserByEmail
};
