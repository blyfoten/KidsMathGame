import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Game from './components/Game';
import Store from './components/Store';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <UserProvider>
        <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route
              path="/game"
              element={isLoggedIn ? <Game /> : <Navigate to="/login" />}
            />
            <Route
              path="/store"
              element={isLoggedIn ? <Store /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;