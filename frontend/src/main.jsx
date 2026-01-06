import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Authority } from "./Middleware/Authority.jsx";
import './base.css'
import './style.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Authority>
        <App />
      </Authority>
    </BrowserRouter>
  </StrictMode>,
)
