import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(json());

// Enable mongoose debug mode
mongoose.set('debug', true);
mongoose.set('strictQuery', true);

// MongoDB connection
console.log('Attempting to connect to MongoDB...');
console.log('Using connection string:', mongoUri);
mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => {
        console.log('MongoDB database connection established successfully');
        // Log connection details for debugging
        const conn = mongoose.connection;
        console.log('Connection state:', conn.readyState);
        console.log('Connected to database:', conn.name);
    })
    .catch(err => {
        console.error('MongoDB connection error details:');
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
        if (err.code) console.error('Error code:', err.code);
        if (err.errorResponse) console.error('Error response:', JSON.stringify(err.errorResponse, null, 2));
        process.exit(1);
    });

// Routes
import studentRoutes from './routes/students.js';
app.use('/api/students', studentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
