import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Faculty from './pages/users/Faculty';
import Department from './pages/users/Department';
import LecturerScreen from './pages/users/Lecturers';
import Questioniar from './pages/users/Questioniar';
import Info from './pages/users/Info';
import Root from './pages/admin/Root';
import Overview from './pages/admin/overview/Overview';
import Admins from './pages/admin/admins/Admins';
import Lecturers from './pages/admin/lecturers/Lecturers';
import Appraisals from './pages/admin/apprasials/Appraisals';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/info' element={<Info />} />
          <Route path='/faculty' element={<Faculty />} />
          <Route path='/department/:dept' element={<Department />} />
          <Route path='/lecturers' element={<LecturerScreen />} />
          <Route path='/form' element={<Questioniar />} />
          <Route path='/dashboard' element={<Root />}>
            <Route index element={<Overview />} />
            <Route path='/dashboard/admins' element={<Admins />} />
            <Route path='/dashboard/lecturers' element={<Lecturers />} />
            <Route path='/dashboard/appraisals' element={<Appraisals />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

