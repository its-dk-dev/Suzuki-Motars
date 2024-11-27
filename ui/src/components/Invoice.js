import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { transformDataForHeaderRow } from '../utils/helpers';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, useMatch } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';

const AccessoriesRenderer = ({ value }) => {
  console.log("Value: ", {value})
  return (
    <ul>
      {value.map((item, index) => (
        <li key={index}>
          {item.name}: {item.price}
        </li>
      ))}
    </ul>
  );
} 

function Invoice({bikesData}) {
  const [selectedBike, setSelectedBike] = useState(undefined)
  const location = useLocation();
  const match = useMatch('/invoices'); 

  console.log(match, location.hash)

  const [selectedBikeModels, setSelectedBikeModels] = useState(selectedBike?.models)

  useEffect(() => {
    selectedBike && setSelectedBikeModels(selectedBike.models)
  }, [selectedBike?.name])

  useEffect(() => {
    if (match) {
      bikesData.forEach(bike => {
        console.log({bike})
        if(location.hash == `#${bike.name}`) {
          setSelectedBike(bike)
        }
    })
    }
  }, [location.hash]);

  const { columnDefs, newData } = transformDataForHeaderRow(selectedBikeModels);


  return (
    // <>
    //   <NavDropdown title={`${selectedBike?.name ?? 'Choose Bike'}`} id="basic-nav-dropdown">
    //     {
    //       bikesData.map(bike => <NavDropdown.Item href={`/invoices#${bike.name}`}>{bike.name}</NavDropdown.Item>)
    //     }
    //   </NavDropdown>
    //   {
    //     selectedBike ?
    //     <div
    //       className="ag-theme-quartz" // applying the Data Grid theme
    //       style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    //     >
    //       <AgGridReact
    //         rowData={newData}
    //         columnDefs={columnDefs}
    //         // frameworkComponents={frameworkComponents}
    //         // masterDetail={true}
    //         // detailCellRendererParams={{
    //         //   detailGridOptions: {
    //         //     columnDefs: [
    //         //       { headerName: 'Accessory', field: 'name' },
    //         //       { headerName: 'Price', field: 'price' },
    //         //     ],
    //         //   },
    //         //   getDetailRowData: (params) => {
    //         //     params.successCallback(params.data.Accessories);
    //         //   },
    //         // }}
    //       />
    //     </div> : null
    //   }
    // </>
    <InvoiceForm bikes={bikesData}/>
  )
}

export default Invoice