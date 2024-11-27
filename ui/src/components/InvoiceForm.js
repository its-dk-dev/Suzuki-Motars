import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { transformDataForHeaderRow } from '../utils/helpers';
import { AgGridReact } from 'ag-grid-react';


const InvoiceForm = ({ bikes }) => {
  const [customers, setCustomers] = useState([]); // Store previously saved customers
  const [selectedBike, setSelectedBike] = useState(null); // Selected bike and model details
  const [tableData, setTableData] = useState([])

  // Fetch customers and bike data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await axios.get("/api/customers");
        setCustomers(customerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    customerName: Yup.string().required("Customer name is required"),
    customerPhone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Customer phone number is required"),
    bike: Yup.string().required("Please select a bike"),
    model: Yup.string().required("Please select a model"),
  });

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerPhone: "",
      bike: "",
      model: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const invoiceData = {
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          bike: values.bike,
          model: values.model,
          bikeDetails: selectedBike,
        };

        const response = await axios.post("/api/invoices", invoiceData);
        alert("Invoice generated successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error generating invoice:", error);
        alert("Failed to generate invoice. Please try again.");
      }
    },
  });

  // Handle bike selection and auto-populate model details
  const handleBikeSelection = (e) => {
    const bikeName = e.target.value;
    const bike = bikes.find((b) => b.name === bikeName);
    setSelectedBike(bike);
    formik.setFieldValue("bike", bikeName);
  };

  const handleModelSelection = (e) => {
    const modelName = e.target.value;

    const modelDetails = bikes
      .find((bike) => bike.name === formik.values.bike)
      ?.models.find((model) => model["Model Name"] === modelName);

    formik.setFieldValue("model", modelName);

    setTableData(transformDataForHeaderRow([{
      "Name": formik.values.bike,
      ...modelDetails
    }]))
  };


  return (
    <Form onSubmit={formik.handleSubmit} className="p-4">
      <h3 className="mb-4">Generate Invoice</h3>

      <Row className="mb-3">
        {/* Customer Name */}
        <Form.Group as={Col} controlId="customerName">
          <Form.Label>Customer Name</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              list="customerList"
              placeholder="Enter customer name"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.customerName && formik.touched.customerName}
            />
            <datalist id="customerList">
              {customers.map((customer) => (
                <option key={customer._id} value={customer.name} />
              ))}
            </datalist>
          </InputGroup>
          <Form.Control.Feedback type="invalid">{formik.errors.customerName}</Form.Control.Feedback>
        </Form.Group>

        {/* Customer Phone */}
        <Form.Group as={Col} controlId="customerPhone">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={formik.values.customerPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.customerPhone && formik.touched.customerPhone}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.customerPhone}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        {/* Bike Dropdown */}
        <Form.Group as={Col} controlId="bike">
          <Form.Label>Select Bike</Form.Label>
          <Form.Select
            value={formik.values.bike}
            onChange={handleBikeSelection}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.bike && formik.touched.bike}
          >
            <option value="">Select a bike</option>
            {bikes.map((bike) => (
              <option key={bike._id} value={bike.name}>
                {bike.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{formik.errors.bike}</Form.Control.Feedback>
        </Form.Group>

        {/* Model Dropdown */}
        <Form.Group as={Col} controlId="model">
          <Form.Label>Select Model</Form.Label>
          <Form.Select
            value={formik.values.model}
            onChange={handleModelSelection}
            onBlur={formik.handleBlur}
            disabled={!formik.values.bike}
            isInvalid={!!formik.errors.model && formik.touched.model}
          >
            <option value="">Select a model</option>
            {selectedBike?.models.map((model, index) => (
              <option key={index} value={model["Model Name"]}>
                {model["Model Name"]}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{formik.errors.model}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      {
        tableData.newData ?
          <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              rowData={tableData?.newData}
              columnDefs={tableData?.columnDefs}
            />
          </div> : null
      }

      <Button variant="primary" type="submit" className="mt-4">
        Generate Invoice
      </Button>
    </Form>
  );
};

export default InvoiceForm;
