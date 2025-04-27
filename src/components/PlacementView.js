import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import axios from 'axios';

const subjects = ['DBMS', 'Web Development', 'Desktop Programming', 'Data Science'];

function PlacementView() {
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const fetchStudents = useCallback(async () => {
    try {
      const url = selectedSubject
        ? `http://localhost:5000/api/students/by-subject/${selectedSubject}`
        : 'http://localhost:5000/api/students';
      const response = await axios.get(url);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error loading students. Please try again.');
    }
  }, [selectedSubject]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);



  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Placement Department View
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter by Subject</InputLabel>
        <Select
          value={selectedSubject}
          label="Filter by Subject"
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <MenuItem value="">All Students</MenuItem>
          {subjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Favorite Subjects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.contactNo}</TableCell>
                <TableCell>{student.address}</TableCell>
                <TableCell>{student.favoriteSubjects.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PlacementView;
