import { useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Button,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

const subjects = ['DBMS', 'Web Development', 'Desktop Programming', 'Data Science'];

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNo: '',
    favoriteSubjects: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => {
      const subjects = prev.favoriteSubjects.includes(subject)
        ? prev.favoriteSubjects.filter((s) => s !== subject)
        : [...prev.favoriteSubjects, subject];
      return { ...prev, favoriteSubjects: subjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', formData);
      alert('Student registered successfully!');
      setFormData({
        name: '',
        address: '',
        contactNo: '',
        favoriteSubjects: [],
      });
    } catch (error) {
      alert('Error registering student. Please try again.');
      console.error(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Student Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Contact Number"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Favorite Subjects</FormLabel>
          <FormGroup>
            {subjects.map((subject) => (
              <FormControlLabel
                key={subject}
                control={
                  <Checkbox
                    checked={formData.favoriteSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                  />
                }
                label={subject}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Paper>
  );
}

export default StudentForm;
