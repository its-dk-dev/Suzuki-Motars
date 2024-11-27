import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import BikesData from './components/BikesData';
import Invoice from './components/Invoice';
import Navigation from './components/Navigation';
import useBikes from './hooks/useBikes';

function App() {
  const { bikes, setBikes } = useBikes();

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={<BikesData bikes={bikes} setBikesData={setBikes} />}
          />
          <Route path="/invoices" element={<Invoice bikesData={bikes} />} />
          <Route
            path="/bikes"
            element={<BikesData bikes={bikes} setBikesData={setBikes} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
