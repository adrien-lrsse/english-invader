import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/';
import Game from './pages/Game/';
import CreateTopic from './pages/CreateTopic/';
import MyTopics from './pages/MyTopics';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/topic' element={<CreateTopic />} />
        <Route path='/mytopics' element={<MyTopics />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
