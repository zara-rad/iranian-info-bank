const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

// POST /api/payment/create-payment-intent - Create Stripe payment intent
router.post('/create-payment-intent', [
  body('email').isEmail().normalizeEmail(),
  body('paymentMethod').isIn(['stripe', 'paypal', 'bank']),
  body('userData').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { email, paymentMethod, userData } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    // Registration fee in cents (€12 = 1200 cents)
    const amount = 1200

    if (paymentMethod === 'stripe') {
      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
        metadata: {
          email: email,
          userData: JSON.stringify(userData)
        }
      })

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      })
    } else if (paymentMethod === 'paypal') {
      // For PayPal, return payment details
      res.json({
        paymentMethod: 'paypal',
        amount: 12,
        currency: 'EUR',
        email: email,
        userData: userData
      })
    } else if (paymentMethod === 'bank') {
      // For bank transfer, return bank details
      res.json({
        paymentMethod: 'bank',
        amount: 12,
        currency: 'EUR',
        bankDetails: {
          accountHolder: 'Iranian Info Bank Germany',
          iban: 'DE89 3704 0044 0532 0130 00',
          bic: 'COBADEFFXXX',
          reference: `REG-${Date.now()}-${email.split('@')[0]}`
        },
        email: email,
        userData: userData
      })
    }

  } catch (error) {
    console.error('Payment creation error:', error)
    res.status(500).json({ message: 'Error creating payment' })
  }
})

// POST /api/payment/confirm-payment - Confirm payment and create user
router.post('/confirm-payment', [
  body('paymentIntentId').optional().isString(),
  body('paymentMethod').isIn(['stripe', 'paypal', 'bank']),
  body('userData').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { paymentIntentId, paymentMethod, userData, paypalTransactionId, bankTransferReference } = req.body

    let paymentConfirmed = false
    let transactionId = null

    if (paymentMethod === 'stripe' && paymentIntentId) {
      // Verify Stripe payment
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      if (paymentIntent.status === 'succeeded') {
        paymentConfirmed = true
        transactionId = paymentIntentId
      }
    } else if (paymentMethod === 'paypal' && paypalTransactionId) {
      // For PayPal, you would verify with PayPal API
      // For now, we'll assume it's confirmed (implement PayPal verification)
      paymentConfirmed = true
      transactionId = paypalTransactionId
    } else if (paymentMethod === 'bank' && bankTransferReference) {
      // For bank transfer, mark as pending - admin will confirm manually
      paymentConfirmed = false // Will be confirmed by admin
      transactionId = bankTransferReference
    }

    if (!paymentConfirmed && paymentMethod !== 'bank') {
      return res.status(400).json({ message: 'Payment not confirmed' })
    }

    // Create user account
    const user = new User({
      ...userData,
      hasActivePlan: paymentConfirmed,
      planType: 'basic',
      paymentHistory: [{
        amount: 12,
        currency: 'EUR',
        paymentMethod: paymentMethod,
        paymentDate: new Date(),
        transactionId: transactionId,
        status: paymentConfirmed ? 'completed' : 'pending'
      }],
      subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      isActive: paymentConfirmed, // Only active if payment confirmed
      acceptedTerms: true,
      acceptedPrivacy: true,
      acceptedAt: new Date()
    })

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(201).json({
      message: paymentConfirmed ? 'Registration completed successfully' : 'Registration pending payment confirmation',
      user: userResponse,
      paymentStatus: paymentConfirmed ? 'completed' : 'pending'
    })

  } catch (error) {
    console.error('Payment confirmation error:', error)
    res.status(500).json({ message: 'Error confirming payment and creating account' })
  }
})

// POST /api/payment/admin-register - Super admin free registration
router.post('/admin-register', [
  body('adminKey').equals(process.env.SUPER_ADMIN_KEY),
  body('userData').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid admin key or data', 
        errors: errors.array() 
      })
    }

    const { userData } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    // Create user account without payment
    const user = new User({
      ...userData,
      hasActivePlan: true,
      planType: 'premium', // Give premium to admin-created accounts
      subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      isActive: true,
      isVerified: true,
      acceptedTerms: true,
      acceptedPrivacy: true,
      acceptedAt: new Date(),
      paymentHistory: [{
        amount: 0,
        currency: 'EUR',
        paymentMethod: 'admin_free',
        paymentDate: new Date(),
        transactionId: 'ADMIN_FREE_' + Date.now(),
        status: 'completed'
      }]
    })

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(201).json({
      message: 'Admin registration completed successfully',
      user: userResponse
    })

  } catch (error) {
    console.error('Admin registration error:', error)
    res.status(500).json({ message: 'Error creating admin account' })
  }
})

module.exports = router