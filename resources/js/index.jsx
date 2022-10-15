import './bootstrap';
import '../css/app.css';
import App from './App';
import { createRoot } from 'react-dom/client';	
import { BrowserRouter } from 'react-router-dom';
import { PropertyContextProvider } from './Context/PropertyContext';
import { CookiesProvider } from "react-cookie";


const root = createRoot(document.getElementById('app'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <PropertyContextProvider>
          <App />
      </PropertyContextProvider>
    </BrowserRouter>
  </CookiesProvider>
);  