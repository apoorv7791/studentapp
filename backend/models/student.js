import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    favoriteSubjects: [{
        type: String,
        enum: ['DBMS', 'Web Development', 'Desktop Programming', 'Data Science'],
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Student', studentSchema, 'students');
