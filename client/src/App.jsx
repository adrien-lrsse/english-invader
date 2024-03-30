import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/';
import Game from './pages/Game/';
import CreateTopic from './pages/CreateTopic/';
import MyTopics from './pages/MyTopics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import GameCanvas from './components/Game/GameCanvas';
import MyOrganizations from './pages/MyOrganizations';
import NewOrganization from './pages/newOrganization';
import EditTopic from './pages/EditTopic';
import Explore from './pages/Explore';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/game/:idTopic'element={<Game />} />
        <Route path='/topic' element={<CreateTopic />} />
        <Route path="/edit-topic/:topicId" element={<EditTopic />} />
        <Route path='/mytopics' element={<MyTopics />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/myorganizations' element={<MyOrganizations />} />
        <Route path='/neworganization' element={<NewOrganization />} />
        <Route path='/explore' element={<Explore />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
