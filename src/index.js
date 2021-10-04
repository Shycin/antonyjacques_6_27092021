import React from 'react'
import ReactDOM from 'react-dom'

import Home from './views/Home'
import PhotographerPage from './views/PhotographerPage'
import Routes from './Routes'

import { ContextProvider } from './Provider'

import './css/reset.scss';

ReactDOM.render(
    <React.StrictMode>

      <ContextProvider>
        <Routes
          urls={{
            home: <Home />,
            photographerpage: <PhotographerPage />
          }}>
        </Routes>
      </ContextProvider>

    </React.StrictMode>,
    document.getElementById('root')
)