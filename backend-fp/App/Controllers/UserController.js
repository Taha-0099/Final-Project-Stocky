// backend-fp/App/Controllers/UserController.js

const UserModel = require('../../Models/UserModel');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');

const SECRET = 'I live in shadbagh 341-D';

module.exports = {
  // POST /Users/register
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    // 1. Validate all fields (no null/empty allowed)
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    try {
      // 2. Check if name OR email already exists (case-insensitive)
      const exists = await UserModel.findOne({
        $or: [
          { name:  { $regex: `^${name.trim()}$`,  $options: 'i' } },
          { email: { $regex: `^${email.trim()}$`, $options: 'i' } }
        ]
      });
      if (exists) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }

      // 3. Hash & save
      const hash = await bcrypt.hash(password.trim(), 10);
      // Default role to 'User' unless 'Admin' is specifically set
      const userRole = (role && role === 'Admin') ? 'Admin' : 'User';

      await UserModel.create({
        name:     name.trim(),
        email:    email.trim(),
        password: hash,
        role:     userRole
      });

      res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
      console.error('Registration error:', err);
      // E11000 duplicate key error (MongoDB unique error)
      if (err.code === 11000) {
        return res.status(400).json({ message: 'Duplicate field: username or email' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  },


getAll: async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching users' });
  }
},


// PATCH /Users/update/:id
update: async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }
  try {
    const updateFields = { name: name.trim(), email: email.trim(), role };

    if (password && password.trim()) {
      const hash = await bcrypt.hash(password.trim(), 10);
      updateFields.password = hash;
    }

    // Check if name/email taken by someone else (ignore self)
    const exists = await UserModel.findOne({
      $and: [
        { _id: { $ne: req.params.id } },
        {
          $or: [
            { name: { $regex: `^${name.trim()}$`, $options: 'i' } },
            { email: { $regex: `^${email.trim()}$`, $options: 'i' } }
          ]
        }
      ]
    });
    if (exists) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
},


// DELETE /Users/delete/:id
delete: async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
},



  // POST /Users/login
  login: async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: 'Name and password are required.' });
    }
    try {
      // Find by name (case-insensitive)
      const user = await UserModel.findOne({
        name: { $regex: `^${name.trim()}$`, $options: 'i' }
      });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Verify password
      const match = await bcrypt.compare(password.trim(), user.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Sign token (include role)
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        token,
        user: { name: user.name, email: user.email, role: user.role }
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
          name:     decoded.name,
          email:    decoded.email,
          role:     decoded.role
        }
      });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
};
