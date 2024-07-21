import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png'
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
