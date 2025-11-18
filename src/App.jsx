import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRoutes from './routes/AppRoutes'
import MyState from './context/data/myState'
import AuthProvider from './components/auth/AuthProvider'

function App() {
  return (
    <MyState>
      <Router>
        <AuthProvider>
          <div className="app">
            <AppRoutes />
            <ToastContainer position="bottom-right" />
          </div>
        </AuthProvider>
      </Router>
    </MyState>
  )
}

export default App