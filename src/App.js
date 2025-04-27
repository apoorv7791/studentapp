import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import StudentForm from './components/StudentForm';
import PlacementView from './components/PlacementView';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Register Student
          </Button>
          <Button color="inherit" component={Link} to="/placement">
            Placement View
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/placement" element={<PlacementView />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
