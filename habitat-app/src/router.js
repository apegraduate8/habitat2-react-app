import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import UserImages from './UserImages';



export default (
  <BrowserRouter>
      <div className="Container">
            <Route exact path='/' component={ App } />
            <Route exact path='/administrationHabitat' component={ Admin } />
            <Route path='/image/:id' component={ UserImages } />
      </div>
  </BrowserRouter>

  )

