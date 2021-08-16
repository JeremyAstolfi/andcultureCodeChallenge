import React, { Component } from 'react';
import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';
import './ResultsPage.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class ResultsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      breweries: [],
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 11,
    }
  }

  getLocation = (address) => {
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        var center = { lat: lat, lng: lng };
        this.setState({ 
          center: center
        });
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
  }

  componentDidMount() {
    Geocode.setApiKey(""); // Insert Google Maps API Key here

    let formattedCity = this.props.city;
    formattedCity = formattedCity.replace(" ", "_");

    let url = 'https://api.openbrewerydb.org/breweries?by_city=' + formattedCity;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({ breweries: data });
    });

    this.getLocation(formattedCity);
  }

  render()
  {
    return (
      <div className="ResultsPage">
          <div>
            {
              this.state.breweries.map(brewery => {
              return (
                <div className="BreweryEntry">
                  <div>
                    <span className="BreweryName">{brewery.name}</span>
                    <span className="BreweryURL">
                      <a href={brewery.website_url}>
                        {brewery.website_url}
                        </a>
                    </span>
                  </div>
                  <div>{brewery.brewery_type}</div>
                  <div>{brewery.street}, {brewery.city}, {brewery.state}, {brewery.postal_code}</div> 
                </div>
              )
            })}
          </div>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: ''/* YOUR KEY HERE */ }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            >
              <AnyReactComponent
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
      </div>
    );
  }
}
