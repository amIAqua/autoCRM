import React from 'react'
import ReactDOM from 'react-dom'

// redux
import { Provider } from 'react-redux'
import { store } from './store'

// router
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './App'
import reportWebVitals from './reportWebVitals'

// ant design and css
import 'antd/dist/antd.css'
import '@ant-design/icons'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
