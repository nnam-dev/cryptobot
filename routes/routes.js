// routes.js
const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// API routes
router.get('/api/users', (req, res) => {
    // Logic to fetch all users from the database
    res.json({ users: '' }); // Example response
});

router.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    // Logic to fetch user by ID from the database
    res.json({ user: { id: userId, name: 'John Doe', email: 'john@example.com' } }); // Example response
});

router.post('/api/users', (req, res) => {
    // Logic to create a new user in the database
    const { name, email } = req.body;
    // Example validation
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    res.status(201).json({ message: 'User created successfully' }); // Example response
});

router.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    // Logic to update user by ID in the database
    res.json({ message: `User with ID ${userId} updated successfully` }); // Example response
});

router.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    // Logic to delete user by ID from the database
    res.json({ message: `User with ID ${userId} deleted successfully` }); // Example response
});

// Export the router
module.exports = router;
