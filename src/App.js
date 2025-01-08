// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importa tus componentes
import LoginScreen from './components/Screens/LoginScreen';
import FavouriteScreen from './components/Screens/FavouriteScreen';
import ListScreen from './components/Screens/ListScreen';
import NewVideoScreen from './components/Screens/NewVideoScreen';
import UserScreen from './components/Screens/UserScreen';
import RegisterScreen from './components/Screens/RegisterScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/favourites" element={<FavouriteScreen />} />
          <Route path="/list" element={<ListScreen />} />
          <Route path="/new-video" element={<NewVideoScreen />} />
          <Route path="/user" element={<UserScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
