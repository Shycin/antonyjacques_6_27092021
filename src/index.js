import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.scss'
import Routes from './Routes'
import { ContextProvider } from './selectContext'
import Home from './views/Home'
import PhotographerPage from './views/PhotographerPage'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Routes
        urls={{
          home: <Home />,
          photographerpage: <PhotographerPage />,
        }}
      />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
