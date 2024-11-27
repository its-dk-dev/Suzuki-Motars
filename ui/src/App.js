import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import BikesData from './components/BikesData';
import Invoice from './components/Invoice';
import Navigation from './components/Navigation';
import useBikes from './hooks/useBikes';

function App() {
  const { bikes, setBikes } = useBikes();

  console.log('bikes', bikes);

  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/invoices" element={<Invoice bikesData={bikes} />} />
          <Route
            path="/bikes"
            element={<BikesData bikes={bikes} setBikesData={setBikes} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
