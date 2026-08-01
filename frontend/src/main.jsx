import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { Authprovider } from '../helpers/Authcontext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authprovider>
    <App />
    </Authprovider>
  </BrowserRouter>,
)
