// backend-fp/App/Controllers/UserController.js

const UserModel = require('../../Models/UserModel');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');

const SECRET = 'I live in shadbagh 341-D';

module.exports = {
  // POST /Users/register
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // check if username OR email already exists (case-insensitive)
      const exists = await UserModel.findOne({
        $or: [
          { username: { $regex: `^${username.trim()}$`, $options: 'i' } },
          { email:    { $regex: `^${email.trim()}$`,    $options: 'i' } }
        ]
      });
      if (exists) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }

      // hash & save
      const hash = await bcrypt.hash(password.trim(), 10);
      await UserModel.create({
        username: username.trim(),
        email:    email.trim(),
        password: hash
      });

      res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // POST /Users/login
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      // find by username, case-insensitive
      const user = await UserModel.findOne({
        username: { $regex: `^${username.trim()}$`, $options: 'i' }
      });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // verify password
      const match = await bcrypt.compare(password.trim(), user.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // sign token
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        token,
        user: { username: user.username, email: user.email }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // GET /Users/verifyToken
  verifyToken: (req, res) => {
    // support both "Authorization: Bearer <token>" and "x-access-token: <token>"
    const authHeader = req.headers.authorization || req.headers['x-access-token'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    try {
      const decoded = jwt.verify(token, SECRET);
      // return minimal user info
      res.json({
        user: {
          id:       decoded.id,
          username: decoded.username,
          email:    decoded.email
        }
      });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
};
