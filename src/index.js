import React from 'react'
import ReactDOM from 'react-dom'

import Home from './views/Home'
import Routes from './Routes'

import { ContextProvider } from './Provider'

ReactDOM.render(
    <React.StrictMode>

      <ContextProvider>
        <Routes
          urls={{
            home: <Home />
          }}>
        </Routes>
      </ContextProvider>

    </React.StrictMode>,
    document.getElementById('root')
)