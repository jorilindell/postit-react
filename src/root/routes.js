// @flow

import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Boards from '../board/Boards'
import BoardDetails from '../boarddetails/BoardDetails'
import NotFound from '../notfound/NotFound'

export default
  <Route path="/">
    <IndexRoute component={Boards}/>
    <Route path='/:boardId' component={BoardDetails} />
    <Route path='*' component={NotFound} />
  </Route>
