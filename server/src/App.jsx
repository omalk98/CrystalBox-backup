import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppRoutes from './AppRoutes';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const theme = useSelector((state) => state.theme);
  document.body.classList.add(`body-${theme}`);

  return (
    <div
      id="CBox"
      className={`C-box C-box-${theme}`}
    >
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>
      <BrowserRouter>
        <Header />
        <main id="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
