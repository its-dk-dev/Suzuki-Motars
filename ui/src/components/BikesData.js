import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import OffCanvas from '../layouts/Offcanvas';
import BikeForm from './BikeForm'
import { Accordion, Card } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';


function BikesData({ bikes, setBikesData }) {
    // Define columns for AG Grid
    const columns = [
      { headerName: 'Model Name', field: 'Model Name' },
      { headerName: 'Ex-Showroom Price', field: 'Ex-Showroom price' },
      { headerName: 'RTO', field: 'RTO' },
      { headerName: 'Insurance', field: 'Insurance' },
      { headerName: 'HPA', field: 'HPA' },
      { headerName: 'Others', field: 'Others' },
      { headerName: 'PDI', field: 'PDI' },
      { headerName: 'Total', field: 'Total' },
      { headerName: 'Image', field: 'Image' }
    ];

  const [isAddNewBike, setIsAddNewBike] = useState(false)
  const [selectedBike, setSelectedBike] = useState(undefined)

  return (
    <>
      <div className='d-flex gap-2'>
        <Button onClick={() => setIsAddNewBike(true)}>{selectedBike ? "Edit": "Add"}</Button>
        {selectedBike && <Button onClick={() => {
          setBikesData((bikesData) => bikesData.filter(bikedata => bikedata.name != selectedBike.name))
        }}>Delete</Button>}
      </div>
      {
        isAddNewBike && <OffCanvas title="Add New Bike" onClose={setIsAddNewBike}>
          <BikeForm initialValues={selectedBike} onSubmit={(bikesDetails) => {
            setBikesData((bikesData) => ([...bikesData, bikesDetails]))
            setIsAddNewBike(false)
          }} />
        </OffCanvas>
      }
      <div className='mt-2'>
      {
        bikes.length ? <Accordion>
            {bikes.map((bike, index) => (
                <Accordion.Item eventKey={index.toString()} >
                <Accordion.Header> {bike.name || 'Unnamed'}</Accordion.Header>
                <Accordion.Body onEntering={() => setSelectedBike(bike)} onExiting={() => setSelectedBike(undefined)}>
                  <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
                      <AgGridReact
                        rowData={bike.models}
                        columnDefs={columns}
                        domLayout='autoHeight'
                      />
                    </div>
                </Accordion.Body>
                </Accordion.Item> 
            ))}
          </Accordion>
          : <h6>No bike added</h6>
      }
      </div>

    </>
  )
}

export default BikesData