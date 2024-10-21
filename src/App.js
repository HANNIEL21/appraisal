import {BrowserRouter  as Router, Route, Switch, Routes} from 'react-router-dom';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path='/' element={<Auth/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

