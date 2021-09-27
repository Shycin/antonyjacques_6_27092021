import React from 'react'
import ReactDOM from 'react-dom'

import Home from './views/Home'
import Routes from './Routes'

ReactDOM.render(
  <React.StrictMode>
    <Routes
      urls={{
        home: <Home />
      }} />
  </React.StrictMode>,
  document.getElementById('root')
)