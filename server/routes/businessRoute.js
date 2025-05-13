const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const upload = require('../middleware/uploadMiddleware');

/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: API endpoints for managing businesses
 */

/**
 * @swagger
 * /business:
 *   get:
 *     summary: Get all businesses
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 */
router.get('/', businessController.getBusinesses);

/**
 * @swagger
 * /business/userId:
 *   get:
 *     summary: Get a business by user ID
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID associated with the business
 *     responses:
 *       200:
 *         description: Business details for the user ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 */
router.get('/userId', businessController.getBusinessByUserId);

/**
 * @swagger
 * /business:
 *   post:
 *     summary: Create a new business
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInput'
 *     responses:
 *       201:
 *         description: Business created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 */
 router.post('/', upload.single('image'), businessController.createBusiness);

/**
 * @swagger
 * /business/{id}:
 *   put:
 *     summary: Update a business by ID
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInput'
 *     responses:
 *       200:
 *         description: Business updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 */
router.put('/:id', businessController.updateBusiness);

/**
 * @swagger
 * /business/{id}:
 *   delete:
 *     summary: Delete a business by ID
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID
 *     responses:
 *       200:
 *         description: Business deleted
 *       404:
 *         description: Business not found
 */
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;