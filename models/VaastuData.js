const mongoose = require('mongoose');

const vaastuDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'directions',
      'elements',
      'rooms',
      'deities',
      'colors',
      'materials',
      'plants',
      'remedies',
      'principles',
      'diagrams',
      'calculations'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    alt: String,
    caption: String,
    type: {
      type: String,
      enum: ['diagram', 'illustration', 'photo', 'animation']
    }
  }],
  diagrams: [{
    title: String,
    svgContent: String,
    description: String,
    interactive: {
      type: Boolean,
      default: false
    },
    animationData: {
      type: Object
    }
  }],
  principles: [{
    principle: String,
    explanation: String,
    importance: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    }
  }],
  remedies: [{
    problem: String,
    solution: String,
    materials: [String],
    procedure: String,
    effectiveness: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  }],
  calculations: {
    vastuPurusha: {
      type: Object
    },
    directions: {
      type: Object
    },
    elements: {
      type: Object
    }
  },
  relatedTopics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VaastuData'
  }],
  tags: [String],
  importance: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced', 'expert']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp before saving
vaastuDataSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better search performance
vaastuDataSchema.index({ title: 'text', content: 'text', tags: 'text' });
vaastuDataSchema.index({ category: 1, subcategory: 1 });
vaastuDataSchema.index({ importance: 1 });

module.exports = mongoose.model('VaastuData', vaastuDataSchema);
