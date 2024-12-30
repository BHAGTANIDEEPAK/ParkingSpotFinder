import express from 'express';
import Spot from '../models/spot.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, latitude, longitude, is_available } = req.body;
    const newSpot = new Spot({ name, latitude, longitude, is_available });
    await newSpot.save();
    res.status(201).json(newSpot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { is_available } = req.body;
    const updatedSpot = await Spot.findByIdAndUpdate(req.params.id, { is_available }, { new: true });
    res.json(updatedSpot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
