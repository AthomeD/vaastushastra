const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all consultants
router.get('/consultants', async (req, res) => {
  try {
    const consultants = await User.find({
      role: 'consultant',
      isVerified: true
    }).select('name email profilePicture phone address');

    res.json({
      success: true,
      consultants
    });
  } catch (error) {
    console.error('Get consultants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get consultant details
router.get('/consultants/:id', async (req, res) => {
  try {
    const consultant = await User.findOne({
      _id: req.params.id,
      role: 'consultant',
      isVerified: true
    }).select('name email profilePicture phone address interests');

    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    res.json({
      success: true,
      consultant
    });
  } catch (error) {
    console.error('Get consultant details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Book consultation
router.post('/book', authenticateToken, async (req, res) => {
  try {
    const { consultantId, consultationType, propertyType, propertyDetails, preferredDate, preferredTime, additionalNotes } = req.body;

    // Verify consultant exists
    const consultant = await User.findOne({
      _id: consultantId,
      role: 'consultant',
      isVerified: true
    });

    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    // Create consultation booking
    const consultation = {
      client: req.user._id,
      consultant: consultantId,
      consultationType,
      propertyType,
      propertyDetails,
      preferredDate,
      preferredTime,
      additionalNotes,
      status: 'pending',
      createdAt: new Date()
    };

    // For now, we'll store this in a simple format
    // In a real application, you'd have a separate Consultation model
    const bookingData = {
      ...consultation,
      clientName: req.user.name,
      consultantName: consultant.name
    };

    res.status(201).json({
      success: true,
      message: 'Consultation booked successfully',
      booking: bookingData
    });
  } catch (error) {
    console.error('Book consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's consultation history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    // This would typically query a Consultation model
    // For now, returning a mock response
    const consultations = [
      {
        id: '1',
        consultantName: 'Dr. Rajesh Kumar',
        consultationType: 'residential',
        propertyType: 'house',
        status: 'completed',
        date: '2024-01-15',
        time: '10:00 AM'
      },
      {
        id: '2',
        consultantName: 'Acharya Priya Sharma',
        consultationType: 'commercial',
        propertyType: 'office',
        status: 'scheduled',
        date: '2024-01-20',
        time: '2:00 PM'
      }
    ];

    res.json({
      success: true,
      consultations
    });
  } catch (error) {
    console.error('Get consultation history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get consultation details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    // This would typically query a Consultation model
    // For now, returning a mock response
    const consultation = {
      id: req.params.id,
      consultantName: 'Dr. Rajesh Kumar',
      consultantEmail: 'rajesh.kumar@vaastu.com',
      consultationType: 'residential',
      propertyType: 'house',
      propertyDetails: '3 BHK apartment in Mumbai',
      status: 'completed',
      date: '2024-01-15',
      time: '10:00 AM',
      notes: 'Client requested consultation for new apartment purchase',
      recommendations: [
        'Main entrance should face North or East',
        'Kitchen should be in Southeast direction',
        'Master bedroom should be in Southwest',
        'Avoid placing mirrors opposite to bed'
      ]
    };

    res.json({
      success: true,
      consultation
    });
  } catch (error) {
    console.error('Get consultation details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel consultation
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    // This would typically update a Consultation model
    // For now, returning a success response
    res.json({
      success: true,
      message: 'Consultation cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reschedule consultation
router.put('/:id/reschedule', authenticateToken, async (req, res) => {
  try {
    const { newDate, newTime } = req.body;

    // This would typically update a Consultation model
    // For now, returning a success response
    res.json({
      success: true,
      message: 'Consultation rescheduled successfully',
      newDate,
      newTime
    });
  } catch (error) {
    console.error('Reschedule consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
