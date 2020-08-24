import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherList'

function Routes () {
  return(
    <BrowserRouter>
      <Route component={Landing} path="/" exact/>
      <Route component={TeacherForm} path="/give-classes"/>
      <Route component={TeacherList} path="study"/>
    </BrowserRouter>
  )
}

export default Routes