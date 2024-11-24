import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useMatch } from 'react-router-dom';

import BikesData from './components/BikesData'
import Navigation from './components/Navigation';
import Invoice from './components/Invoice';


function App() {
  const bikeAccessories = [{
    name: 'Helmet',
    price: 'Rs. 10,000'
  }, {
    name: 'Ladies Foot Rest',
    price: 'Rs. 10,000'
  }, {
    name: 'Mirror',
    price: 'Rs. 10,000'
  }, {
    name: 'Jacket',
    price: 'Rs. 10,000'
  }, {
    name: 'Gloves',
    price: 'Rs. 10,000'
  }, {
    name: 'Shoes',
    price: 'Rs. 10,000'
  },
  {
    name: '"Others"',
    price: 'Rs. 10,000'
  }
]

  const [bikesData, setBikesData] = useState([
    {
      name: 'Access',
      models: [
        {
          "Name": 'Access 125',
          "Ex-Showroom price": "Rs. 80,000",
          "RTO": "Rs. 10,000",
          "Insurance": "Rs. 10,000",
          "HPA": "Rs. 10,000",
          "Others": "Rs. 2,000",
          "Accessories": bikeAccessories,
          "PDI": "Rs. 1,200",
          "Total": "Rs. 1,00,000",
          "Image": 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-metallic-mattee-black-std-1679635807338.png?q=80',
        },
        {
          "Name": 'Access BT',
          "Ex-Showroom price": "Rs. 80,000",
          "RTO": "Rs. 10,000",
          "Insurance": "Rs. 10,000",
          "HPA": "Rs. 10,000",
          "Others": "Rs. 2,000",
          "Accessories": bikeAccessories,
          "PDI": "Rs. 1,200",
          "Total": "Rs. 1,00,000",
          "Image": 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-metallic-mattee-black-std-1679635807338.png?q=80',
        },
        {
          "Name": 'Access DB',
          "Ex-Showroom price": "Rs. 80,000",
          "RTO": "Rs. 10,000",
          "Insurance": "Rs. 10,000",
          "HPA": "Rs. 10,000",
          "Others": "Rs. 2,000",
          "Accessories": bikeAccessories,
          "PDI": "Rs. 1,200",
          "Total": "Rs. 1,00,000",
          "Image": 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-metallic-mattee-black-std-1679635807338.png?q=80',
        }
      ]
    },
    {
      name: 'Gixxer',
      models: [
        {
          "Name": 'Gixxer',
          "Ex-Showroom price": "Rs. 80,000",
          "RTO": "Rs. 10,000",
          "Insurance": "Rs. 10,000",
          "HPA": "Rs. 10,000",
          "Others": "Rs. 2,000",
          "Accessories": bikeAccessories,
          "PDI": "Rs. 1,200",
          "Total": "Rs. 1,00,000",
          "Image": 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-pearl-mira-red-1671516588630.png?q=80',
        },
        {
          "Name": 'Gixxer SF',
          "Ex-Showroom price": "Rs. 80,000",
          "RTO": "Rs. 10,000",
          "Insurance": "Rs. 10,000",
          "HPA": "Rs. 10,000",
          "Others": "Rs. 2,000",
          "Accessories": bikeAccessories,
          "PDI": "Rs. 1,200",
          "Total": "Rs. 1,00,000",
          "Image": 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/suzuki-select-model-pearl-mira-red-1671516588630.png?q=80',
        }
      ]
    }
  ])

  return (
    <div className="App">
        <Navigation/>
        <Router>
            <Routes>
              <Route path="/invoices" element={<Invoice bikesData={bikesData}/>} />
              <Route path="/bikes" element={<BikesData bikes={bikesData} setBikesData={setBikesData}/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default App