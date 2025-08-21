const express = require('express');
const router = express.Router();
const VaastuData = require('../models/VaastuData');

// Get all vaastu data with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      subcategory, 
      importance, 
      search, 
      page = 1, 
      limit = 10 
    } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (importance) query.importance = importance;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const vaastuData = await VaastuData.find(query)
      .populate('relatedTopics', 'title category')
      .sort({ importance: 1, title: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await VaastuData.countDocuments(query);

    res.json({
      success: true,
      data: vaastuData,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get vaastu data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific vaastu data by ID
router.get('/:id', async (req, res) => {
  try {
    const vaastuData = await VaastuData.findById(req.params.id)
      .populate('relatedTopics', 'title category description');

    if (!vaastuData) {
      return res.status(404).json({ message: 'Vaastu data not found' });
    }

    res.json({
      success: true,
      data: vaastuData
    });
  } catch (error) {
    console.error('Get vaastu data by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vaastu data by category
router.get('/category/:category', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const vaastuData = await VaastuData.find({
      category: req.params.category,
      isActive: true
    })
    .populate('relatedTopics', 'title category')
    .sort({ importance: 1, title: 1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await VaastuData.countDocuments({
      category: req.params.category,
      isActive: true
    });

    res.json({
      success: true,
      data: vaastuData,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get vaastu data by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search vaastu data
router.get('/search/:query', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const vaastuData = await VaastuData.find({
      $text: { $search: req.params.query },
      isActive: true
    })
    .populate('relatedTopics', 'title category')
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await VaastuData.countDocuments({
      $text: { $search: req.params.query },
      isActive: true
    });

    res.json({
      success: true,
      data: vaastuData,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Search vaastu data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await VaastuData.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get subcategories for a category
router.get('/categories/:category/subcategories', async (req, res) => {
  try {
    const subcategories = await VaastuData.distinct('subcategory', {
      category: req.params.category,
      isActive: true,
      subcategory: { $ne: null, $ne: '' }
    });
    
    res.json({
      success: true,
      subcategories
    });
  } catch (error) {
    console.error('Get subcategories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vaastu diagrams
router.get('/diagrams/list', async (req, res) => {
  try {
    const diagrams = await VaastuData.find({
      'diagrams.0': { $exists: true },
      isActive: true
    })
    .select('title category diagrams')
    .sort({ title: 1 });

    res.json({
      success: true,
      diagrams
    });
  } catch (error) {
    console.error('Get diagrams error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vaastu remedies
router.get('/remedies/list', async (req, res) => {
  try {
    const { category } = req.query;
    const query = {
      'remedies.0': { $exists: true },
      isActive: true
    };

    if (category) {
      query.category = category;
    }

    const remedies = await VaastuData.find(query)
      .select('title category remedies')
      .sort({ title: 1 });

    res.json({
      success: true,
      remedies
    });
  } catch (error) {
    console.error('Get remedies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vaastu principles
router.get('/principles/list', async (req, res) => {
  try {
    const { importance } = req.query;
    const query = {
      'principles.0': { $exists: true },
      isActive: true
    };

    if (importance) {
      query['principles.importance'] = importance;
    }

    const principles = await VaastuData.find(query)
      .select('title category principles')
      .sort({ title: 1 });

    res.json({
      success: true,
      principles
    });
  } catch (error) {
    console.error('Get principles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get related topics
router.get('/:id/related', async (req, res) => {
  try {
    const vaastuData = await VaastuData.findById(req.params.id)
      .populate('relatedTopics', 'title category description');

    if (!vaastuData) {
      return res.status(404).json({ message: 'Vaastu data not found' });
    }

    res.json({
      success: true,
      relatedTopics: vaastuData.relatedTopics
    });
  } catch (error) {
    console.error('Get related topics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
