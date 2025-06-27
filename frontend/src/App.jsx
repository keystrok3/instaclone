
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthProvider';

const App = () => {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/signup' element={<SignUpPage />}/>
            <Route path='/login' element={<LoginPage />}/>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App;
