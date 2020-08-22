import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import HomeTest from './pages/hometest'
import Search from './pages/search'
import Anime from './pages/anime'
import Video from './pages/video'


function App(props) {
  return (
    <Router>
      <Route path='/home/:content' component={HomeTest}></Route>
      <Route path='/search' component={Search}></Route>
      <Route path='/anime/:name' component={Anime}></Route>
      <Route path='/video/:name_episode' component={Video}></Route>

    </Router>
  );
}


export default App;
