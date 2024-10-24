import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Faculty from './pages/users/Faculty';
import Department from './pages/users/Department';
import Lecturers from './pages/users/Lecturers';
import Questioniar from './pages/users/Questioniar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path='/' element={<Auth/>} />
          <Route path='/faculty' element={<Faculty/>} />
          <Route path='/department/:dept' element={<Department/>} />
          <Route path='/lecturers' element={<Lecturers/>} />
          <Route path='/form' element={<Questioniar/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

