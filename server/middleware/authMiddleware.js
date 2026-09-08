const jwt = require('jsonwebtoken');
const User = require('../models/User');

// verify JWT token and attach user to request
const protect = async (req, res, next) => {
  let token;

  // token expected in "Authorization: Bearer <token>" header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // extract token part
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify signature

      req.user = await User.findById(decoded.id).select('-password'); // attach user, exclude password
      next(); // proceed to next middleware/controller
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// restrict route access to specific roles (e.g. admin only)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role '${req.user.role}' not allowed to access this resource` });
    }
    next();
  };
};

module.exports = { protect, authorize };