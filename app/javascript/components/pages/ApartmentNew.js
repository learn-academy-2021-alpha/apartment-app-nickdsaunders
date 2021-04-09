import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

class ApartmentNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: "",
        street: "",
        city: "",
        state: "",
        manager: "",
        email: "",
        price: "",
        bedrooms: 0,
        bathrooms: 0,
        pets: "",
        img: "",
        user_id: 0
      },

      submitted: false
    };
  }

  handleChange = (e) => {
    let { form } = this.state;
    form[e.target.name] = e.target.value;
    // console.log(e.target.name);
    // console.log(form);
    // form.user_id = this.props.current_user.id;
    this.setState({ form: form });
  };

  handleSubmit = () => {
    this.props.createNewApartment(this.state.form);
    this.setState({ submitted: true });
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={{ size: 5, order: 2, offset: 3 }}>
            <h2>Create New Listing</h2>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="street">Street</Label>
                <Input
                  type="text"
                  name="street"
                  value={this.state.street}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  type="text"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="manager">Manager's Name</Label>
                <Input
                  type="text"
                  name="manager"
                  value={this.state.manager}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Contact Email</Label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Monthly Rent</Label>
                <Input
                  type="text"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bedrooms">Number of Bedrooms</Label>
                <Input
                  type="number"
                  name="bedrooms"
                  value={this.state.bedrooms}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bathrooms">Number of Bathrooms</Label>
                <Input
                  type="number"
                  name="bathrooms"
                  value={this.state.bathrooms}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="pets">Are Pets Allowed?</Label>
                <Input
                  type="select"
                  name="pets"
                  value={this.state.pets}
                  onChange={this.handleChange}>
                  <option>Yes</option>
                  <option>No</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="img">Photo</Label>
                <Input
                  type="text"
                  name="img"
                  value={this.state.img}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button onClick={this.handleSubmit}>Submit Apartment</Button>
            </Form>
          </Col>
        </Row>
        {this.state.submitted && <Redirect to="/apartmentindex" />}
      </React.Fragment>
    );
  }
}

export default ApartmentNew;
