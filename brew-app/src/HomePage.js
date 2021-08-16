import React, { Component } from 'react';
import './HomePage.css';
import beerLogo from './Images/BeerLogo.png';

export default class HomePage extends Component {
  constructor(props){
    super(props);
  }

  render()
  {
    return (
      <div className="HomePage">
        <div className="BeerIcon">
            <img src={beerLogo} width="200" height="200" />
        </div>
        <div className="SearchBar">
            <p className="SearchText">Enter a city to search for local breweries</p>
            <input type="search" value={this.props.city} onChange={(event) => this.props.updateCity(event.target.value)} placeholder="Enter a city" />
            <button onClick={() => this.props.updatePage("ResultsPage")}>Search</button>
        </div>
      </div>
    );
  }
}
