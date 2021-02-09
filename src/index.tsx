import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

// redux
import { Provider } from 'react-redux'
import { store } from './store'

// router
import { BrowserRouter as Router } from 'react-router-dom'

// localization
import './localization/i18n'

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
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
