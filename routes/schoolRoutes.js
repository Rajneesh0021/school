const express = require('express');
const router = express.Router();
const db = require('../db');


function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Add School API
router.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;
console.log(req.body)
  
    if (!name || !address || !latitude || !longitude ) {
        return res.status(400).json({ message: 'All fields are required !' });

    }

  
    const query = 'INSERT INTO SCHOOL (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: results.insertId });
    });
});


router.get('/getSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (typeof Number(latitude) !== 'number' || typeof Number(longitude) !== 'number') {
        return res.status(400).json({ message: 'Invalid input coordinates' });
    }

    db.query('SELECT * FROM SCHOOL', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = results.map(school => {
            const distance = getDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    });
});

module.exports = router;
