import { Router } from 'express';
import Student from '../models/student.js';

const router = Router();

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get students by subject
router.get('/by-subject/:subject', async (req, res) => {
    try {
        const students = await Student.find({
            favoriteSubjects: req.params.subject
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        address: req.body.address,
        contactNo: req.body.contactNo,
        favoriteSubjects: req.body.favoriteSubjects
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
