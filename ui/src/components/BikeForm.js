// Import necessary components, hooks, and libraries
import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Bike name is required'),
  models: Yup.array().of(
    Yup.object().shape({
      Name: Yup.string().required('Model name is required'),
      "Ex-Showroom price": Yup.string().required('Ex-Showroom price is required'),
      RTO: Yup.string().required('RTO is required'),
      Insurance: Yup.string().required('Insurance is required'),
      HPA: Yup.string().required('HPA is required'),
      Others: Yup.string().required('Others is required'),
      PDI: Yup.string().required('PDI is required'),
      Total: Yup.string().required('Total is required'),
      Image: Yup.string().url('Image must be a valid URL')
    })
  )
});

function BikeForm({initialValues = {
  name: '',
  models: [
    {
      "Name": '',
      "Ex-Showroom price": '',
      "RTO": '',
      "Insurance": '',
      "HPA": '',
      "Others": '',
      "Accessories": [],
      "PDI": '',
      "Total": '',
      "Image": ''
    }
  ]
}, onSubmit}) {

  const handleSubmit = async (values) => {
    console.log('Bike Details:', values);

    try {
      const response = await axios.post('http://localhost:3001/api/bikes/register', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Bike added successfully:', response.data);
      alert('Bike added successfully!');
      onSubmit(values)
    } catch (error) {
      console.error('Error adding bike:', error);
      alert('Failed to add bike. Please try again.');
    }
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <FormikForm>
            <Form.Group controlId="bikeName">
              <Form.Label>Bike Name</Form.Label>
              <Field
                name="name"
                type="text"
                placeholder="Enter bike name"
                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
              />
              {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </Form.Group>

            <FieldArray name="models">
              {({ push }) => (
                <>
                  {values.models.map((model, index) => (
                    <div key={index} className="mt-4">
                      <h5>Model {index + 1}</h5>
                      {Object.keys(model).map((field) => (
                        field !== "Accessories" && (
                          <Form.Group key={field} controlId={`${field}-${index}`}>
                            <Form.Label>{field}</Form.Label>
                            <Field
                              name={`models[${index}]['${field}']`}
                              type="text"
                              placeholder={`Enter ${field}`}
                              className={`form-control ${
                                touched.models?.[index]?.[field] && errors.models?.[index]?.[field]
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            {touched.models?.[index]?.[field] && errors.models?.[index]?.[field] && (
                              <div className="invalid-feedback">
                                {errors.models[index][field]}
                              </div>
                            )}
                          </Form.Group>
                        )
                      ))}
                    </div>
                  ))}

                  <Button
                    disabled={!Object.keys(touched).length || Object.keys(errors).length}
                    variant="secondary"
                    onClick={() =>
                      push({
                        "Name": '',
                        "Ex-Showroom price": '',
                        "RTO": '',
                        "Insurance": '',
                        "HPA": '',
                        "Others": '',
                        "Accessories": [],
                        "PDI": '',
                        "Total": '',
                        "Image": ''
                      })
                    }
                    className="mt-3"
                  >
                    Add Another Model
                  </Button>
                </>
              )}
            </FieldArray>

            <Button disabled={!Object.keys(touched).length || Object.keys(errors).length} variant="primary" type="submit" className="mt-3 ml-2 ms-2">
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
}

export default BikeForm;
