const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (for contacts)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } })
      .select('name email avatar userType isOnline lastSeen status aiPersonality trainingLevel');

    res.json({
      users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      message: 'Error fetching users' 
    });
  }
});

// @route   GET /api/users/ai
// @desc    Get all AI users
// @access  Private
router.get('/ai', auth, async (req, res) => {
  try {
    const aiUsers = await User.find({ userType: 'ai' })
      .select('name email avatar aiPersonality isOnline lastSeen status');

    res.json({
      aiUsers
    });

  } catch (error) {
    console.error('Get AI users error:', error);
    res.status(500).json({ 
      message: 'Error fetching AI users' 
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name email avatar userType isOnline lastSeen status aiPersonality trainingLevel');

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Error fetching user' 
    });
  }
});

// @route   PUT /api/users/online-status
// @desc    Update user online status
// @access  Private
router.put('/online-status', auth, async (req, res) => {
  try {
    const { isOnline } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    await user.setOnlineStatus(isOnline);

    res.json({
      message: 'Online status updated successfully',
      isOnline: user.isOnline
    });

  } catch (error) {
    console.error('Update online status error:', error);
    res.status(500).json({ 
      message: 'Error updating online status' 
    });
  }
});

// @route   PUT /api/users/last-seen
// @desc    Update user last seen
// @access  Private
router.put('/last-seen', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    await user.updateLastSeen();

    res.json({
      message: 'Last seen updated successfully',
      lastSeen: user.lastSeen
    });

  } catch (error) {
    console.error('Update last seen error:', error);
    res.status(500).json({ 
      message: 'Error updating last seen' 
    });
  }
});

// @route   PUT /api/users/training-level
// @desc    Update user training level
// @access  Private
router.put('/training-level', auth, async (req, res) => {
  try {
    const { trainingLevel } = req.body;
    
    if (!['beginner', 'intermediate', 'advanced'].includes(trainingLevel)) {
      return res.status(400).json({ 
        message: 'Invalid training level' 
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { trainingLevel },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({
      message: 'Training level updated successfully',
      trainingLevel: user.trainingLevel
    });

  } catch (error) {
    console.error('Update training level error:', error);
    res.status(500).json({ 
      message: 'Error updating training level' 
    });
  }
});

// @route   PUT /api/users/vulnerabilities
// @desc    Update user vulnerabilities
// @access  Private
router.put('/vulnerabilities', auth, async (req, res) => {
  try {
    const { vulnerabilities } = req.body;
    
    if (!Array.isArray(vulnerabilities)) {
      return res.status(400).json({ 
        message: 'Vulnerabilities must be an array' 
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { vulnerabilities },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({
      message: 'Vulnerabilities updated successfully',
      vulnerabilities: user.vulnerabilities
    });

  } catch (error) {
    console.error('Update vulnerabilities error:', error);
    res.status(500).json({ 
      message: 'Error updating vulnerabilities' 
    });
  }
});

module.exports = router; 