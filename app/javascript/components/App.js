import React, { Component } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ApartmentIndex from './pages/ApartmentIndex';
import ApartmentShow from './pages/ApartmentShow';
import ApartmentNew from './pages/ApartmentNew';
import ApartmentEdit from './pages/ApartmentEdit';
import NotFound from './pages/NotFound';
// import mockApartments from "./mockApartments.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: []
    };
  }

  componentDidMount() {
    this.indexApartment();
  }

  indexApartment = () => {
    fetch('http://localhost:3000//apartments')
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((payload) => {
        this.setState({ apartments: payload });
        console.log(payload);
      })
      .catch((errors) => {
        console.log('index errors:', errors);
      });
  };

  createNewApartment = (newApartment) => {
    return fetch('http://localhost:3000//apartments', {
      body: JSON.stringify(newApartment),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then((response) => {
        if (response.status === 422) {
          alert('Please check your submission.');
        }
        return response.json();
      })
      .then((payload) => {
        this.indexApartment();
      })
      .catch((errors) => {
        console.log('create errors:', errors);
      });
  };

  updateApartment = (apartment, id) => {
    console.log('apartment:', apartment);
    console.log('id:', id);

    return fetch(`http://localhost:3000//apartments/${id}`, {
      body: JSON.stringify(apartment),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
      .then((response) => {
        if (response.status === 422) {
          alert('Please check your submission.');
        }
        return response.json();
      })
      .then((payload) => {
        this.indexApartment();
      })
      .catch((errors) => {
        console.log('create errors:', errors);
      });
  };

  deleteApartment = (id) => {
    fetch(`/apartments/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status === 422) {
          alert('Something is wrong with your submission');
        }
        return response.json();
      })
      .then((payload) => {
        this.apartmentIndex();
      })
      .catch((errors) => {
        console.log('delete errors', errors);
      });
  };

  render() {
    const {
      logged_in,
      current_user,
      new_user_route,
      sign_in_route,
      sign_out_route
    } = this.props;
    return (
      <Router>
        <Header
          logged_in={logged_in}
          current_user={current_user}
          new_user_route={new_user_route}
          sign_in_route={sign_in_route}
          sign_out_route={sign_out_route}
        />
        <Switch>
          <Route exact path='/' component={Home} />

          <Route
            path='/apartmentindex'
            render={(props) => (
              <ApartmentIndex apartments={this.state.apartments} />
            )}
          />
          <Route
            exact
            path='/apartmentshow/:id'
            render={(props) => {
              let id = props.match.params.id;
              let apartment = this.state.apartments.find(
                (apartment) => apartment.id === parseInt(id)
              );
              return (
                <ApartmentShow
                  apartment={apartment}
                  deleteApartment={this.deleteApartment}
                />
              );
            }}
          />
          {logged_in && (
            <Route
              path='/apartmentnew'
              render={(props) => {
                return (
                  <ApartmentNew
                    createNewApartment={this.createNewApartment}
                    current_user={current_user}
                  />
                );
              }}
            />
          )}

          <Route
            exact
            path='/apartmentedit/:id'
            render={(props) => {
              let id = props.match.params.id;
              let apartment = this.state.apartments.find(
                (apartment) => apartment.id === parseInt(id)
              );
              return (
                <ApartmentEdit
                  updateApartment={this.updateApartment}
                  apartment={apartment}
                  current_user={current_user}
                />
              );
            }}
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
