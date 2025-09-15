const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const Category = require('../models/Category');
const { authenticate } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// GET /api/businesses - Get all active businesses with filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      subcategory,
      businessCategory,
      businessSubcategories,
      city,
      verified,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build query
    let query = { isActive: true };

    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { descriptionGerman: { $regex: search, $options: 'i' } },
        { descriptionPersian: { $regex: search, $options: 'i' } },
      ];
    }

    // ✅ Support both category & businessCategory
    if (category || businessCategory) {
      query.category = category || businessCategory;
    }

    // ✅ Support both subcategory & businessSubcategories
    if (subcategory || businessSubcategories) {
      query.subcategories = { $in: [subcategory || businessSubcategories] };
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (verified !== undefined) {
      query.isVerified = verified === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const businesses = await Business.find(query)
      .populate('category', 'name nameGerman namePersian icon')
      .populate('owner', 'fullName email') // ✅ changed from userId
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Business.countDocuments(query);

    res.json({
      businesses,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Get businesses error:', error);
    res.status(500).json({ message: 'Error fetching businesses' });
  }
});

// GET /api/businesses/:id - Get business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findOne({
      _id: req.params.id,
      isActive: true,
    })
      .populate('category', 'name nameGerman namePersian icon')
      .populate('owner', 'fullName email phone') // ✅ changed
      .select('-__v');

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Increment view count
    await Business.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json(business);
  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({ message: 'Error fetching business' });
  }
});

// POST /api/businesses - Create new business (authenticated users only)
router.post(
  '/',
  authenticate,
  [
    body('businessName').trim().isLength({ min: 2 }),
    body('ownerName').trim().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().isLength({ min: 10 }),
    body('address').trim().isLength({ min: 5 }),
    body('city').trim().isLength({ min: 2 }),
    body('category').isMongoId(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation failed', errors: errors.array() });
      }

      // Check if category exists
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const business = new Business({
        ...req.body,
        owner: req.user._id, // ✅ changed
        isVerified: false, // Requires admin approval
        isActive: true,
      });

      await business.save();

      const populatedBusiness = await Business.findById(business._id)
        .populate('category', 'name nameGerman namePersian')
        .populate('owner', 'fullName email'); // ✅ changed

      res.status(201).json({
        message: 'Business created successfully. Pending verification.',
        business: populatedBusiness,
      });
    } catch (error) {
      console.error('Create business error:', error);
      res.status(500).json({ message: 'Error creating business' });
    }
  }
);

// PUT /api/businesses/:id - Update business (owner or admin only)
router.put(
  '/:id',
  authenticate,
  [
    body('businessName').optional().trim().isLength({ min: 2 }),
    body('ownerName').optional().trim().isLength({ min: 2 }),
    body('email').optional().isEmail().normalizeEmail(),
    body('phone').optional().trim().isLength({ min: 10 }),
    body('address').optional().trim().isLength({ min: 5 }),
    body('city').optional().trim().isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation failed', errors: errors.array() });
      }

      const business = await Business.findById(req.params.id);
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }

      // Check ownership or admin rights
      const isOwner = business.owner.toString() === req.user._id.toString(); // ✅ changed
      const isAdmin =
        req.user.role === 'admin' || req.user.role === 'super_admin';

      if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Update business
      Object.assign(business, req.body);

      // If significant changes made by owner, require re-verification
      if (
        isOwner &&
        (req.body.businessName || req.body.category || req.body.address)
      ) {
        business.isVerified = false;
      }

      await business.save();

      const updatedBusiness = await Business.findById(business._id)
        .populate('category', 'name nameGerman namePersian')
        .populate('owner', 'fullName email'); // ✅ changed

      res.json({
        message: 'Business updated successfully',
        business: updatedBusiness,
      });
    } catch (error) {
      console.error('Update business error:', error);
      res.status(500).json({ message: 'Error updating business' });
    }
  }
);

// DELETE /api/businesses/:id - Delete business (owner or admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check ownership or admin rights
    const isOwner = business.owner.toString() === req.user._id.toString(); // ✅ changed
    const isAdmin =
      req.user.role === 'admin' || req.user.role === 'super_admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Business.findByIdAndDelete(req.params.id);

    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    console.error('Delete business error:', error);
    res.status(500).json({ message: 'Error deleting business' });
  }
});

// GET /api/businesses/user/:userId - Get businesses by user ID
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const isOwner = req.params.userId === req.user._id.toString();
    const isAdmin =
      req.user.role === 'admin' || req.user.role === 'super_admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const businesses = await Business.find({
      owner: req.params.userId, // ✅ changed
      isActive: true,
    })
      .populate('category', 'name nameGerman namePersian')
      .sort({ createdAt: -1 });

    res.json(businesses);
  } catch (error) {
    console.error('Get user businesses error:', error);
    res.status(500).json({ message: 'Error fetching user businesses' });
  }
});

// POST /api/businesses/:id/contact - Track contact interactions
router.post('/:id/contact', async (req, res) => {
  try {
    const { type } = req.body; // 'phone', 'email', 'website'

    const updateField = {};
    switch (type) {
      case 'phone':
        updateField.clicksPhone = 1;
        break;
      case 'email':
        updateField.clicksEmail = 1;
        break;
      case 'website':
        updateField.clicksWebsite = 1;
        break;
      default:
        return res.status(400).json({ message: 'Invalid contact type' });
    }

    await Business.findByIdAndUpdate(req.params.id, { $inc: updateField });

    res.json({ message: 'Contact interaction tracked' });
  } catch (error) {
    console.error('Track contact error:', error);
    res.status(500).json({ message: 'Error tracking contact' });
  }
});

module.exports = router;
