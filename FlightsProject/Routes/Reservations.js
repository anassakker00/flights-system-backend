const express = require('express');
const router = express.Router();
const Reservations = require('../models/Reservations'); // assuming you have a reservations model in models/Reservations.js

// POST - Create a new Reservations
router.post('/', async (req, res) => {
    const reservations = new reservations({
        date: req.body.date,
        setNumber: req.body.setNumber,
        siege: req.body.siege,
        print: req.body.print,
    });
 
    try {
        const savedReservations= await reservations.save();
        res.status(201).json(savedReservations);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
 
// GET - Retrieve all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservations.find();
        res.json(Reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
 
// GET - Retrieve a single Reservations by ID
router.get('/:id', getReservations, (req, res) => {
    res.json(res.reservations);
});
 
// PATCH - Update a reservations
router.patch('/:id', getReservations, async (req, res) => {
    if (req.body.date != null) {
        res.Reservations.date = req.body.date;
    }
    if (req.body.setNumber != null) {
        res.Reservations.setNumber = req.body.setNumber;
    }
    if (req.body.siege != null) {
        res.Reservations.siege = req.body.siege;
    }
    if (req.body.print != null) {
        res.Reservations.print = req.body.print;
    }
 
    try {
        const updatedReservations = await res.Reservations.save();
        res.json(updatedReservations);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
 
// DELETE - Delete a Reservations
router.delete('/:id', getReservations, async (req, res) => {
    try {
        await res.Reservations.remove();
        res.json({ message: 'Deleted Reservations' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
 
// Middleware to get Reservations by ID
async function getReservations(req, res, next) {
    let Reservations;
    try {
        Reservations = await Reservations.findById(req.params.id);
        if (Reservations == null) {
            return res.status(404).json({ message: 'Cannot find Reservations' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
 
    res.Reservations = Reservations;
    next();
}
 
module.exports = router;