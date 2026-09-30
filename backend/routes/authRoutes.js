const express = require('express');
const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER || 'lekibir';
const ADMIN_PASS = process.env.ADMIN_PASS || 'lake1122@';

// POST /api/auth/login
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        const trimmedUser = String(username).trim();
        const trimmedPass = String(password);

        if (trimmedUser === ADMIN_USER && trimmedPass === ADMIN_PASS) {
            return res.json({
                success: true,
                message: 'Login successful',
                user: {
                    username: ADMIN_USER,
                    role: 'Super Administrator'
                },
                token: 'admin_session_' + Buffer.from(`${ADMIN_USER}:${Date.now()}`).toString('base64')
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server authentication error'
        });
    }
});

// GET /api/auth/verify
router.get('/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer admin_session_')) {
        return res.json({ authenticated: true, user: ADMIN_USER });
    }
    return res.status(401).json({ authenticated: false });
});

module.exports = router;
