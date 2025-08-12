// routes/eventRoutes.js
const express = require('express');
const {
  createEvent,
  getEvents,
  getMyEvents,
  getEventById,
  rsvp,
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createEvent);      // create -> protected
router.get('/', getEvents);                        // list public events
router.get('/mine', authMiddleware, getMyEvents);  // my events -> protected
router.get('/:id', getEventById);                  // event details
router.post('/rsvp/:id', authMiddleware, rsvp);    // RSVP -> protected

module.exports = router;
