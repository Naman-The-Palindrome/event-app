// controllers/eventController.js
const Event = require('../models/Event');
const User = require('../models/User');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, capacity } = req.body;
    // date should be an ISO string (frontend will send combined date+time)
    if (!title || !date) return res.status(400).json({ error: 'Title and date required' });

    const creator = await User.findById(req.user.id).select('name email');
    if (!creator) return res.status(404).json({ error: 'User not found' });

    const event = await Event.create({
      title,
      description,
      date: new Date(date),
      location,
      category,
      capacity: capacity ? Number(capacity) : undefined,
      createdBy: req.user.id,
      attendees: [{
        user: req.user.id,
        name: creator.name,
        email: creator.email,
        role: 'host',
        status: 'confirmed',
      }],
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'name email')
      .populate('attendees.user', 'name email')
      .sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch events' });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({
      $or: [
        { createdBy: userId },
        { 'attendees.user': userId }
      ]
    })
      .populate('createdBy', 'name email')
      .populate('attendees.user', 'name email')
      .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch my events' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('attendees.user', 'name email');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch event' });
  }
};

exports.rsvp = async (req, res) => {
  // expects { status: 'confirmed'|'pending'|'declined' }
  try {
    const userId = req.user.id;
    const { status } = req.body;
    if (!['confirmed', 'pending', 'declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // check if already attendee
    const existingIndex = event.attendees.findIndex(a => a.user && a.user.toString() === userId);

    if (existingIndex !== -1) {
      // update status
      event.attendees[existingIndex].status = status;
    } else {
      const user = await User.findById(userId).select('name email');
      event.attendees.push({
        user: userId,
        name: user ? user.name : 'Anonymous',
        email: user ? user.email : '',
        role: 'guest',
        status,
      });
    }

    await event.save();
    const populated = await event.populate('createdBy', 'name email').populate('attendees.user', 'name email');
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'RSVP failed' });
  }
};
