import React, { Component } from 'react';
import './App.css';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 'HomePage',
      city: '',
    }
    this.updatePage = this.updatePage.bind(this);
    this.updateCity = this.updateCity.bind(this);
  }

  updatePage = (newPage) => {
    if(this.state.city !== null && this.state.city !== '') {
      this.setState({currentPage: newPage});
    }
  }
  updateCity = (newCity) => {
    this.setState({city: newCity});
  }

  componentDidMount() {
  }

  SwitchPages() {
    switch(this.state.currentPage){
      case "ResultsPage":
        return <ResultsPage city={this.state.city} updatePage={this.updatePage} updateCity={this.updateCity} />
      default:
        return <HomePage updatePage={this.updatePage} updateCity={this.updateCity} />
    }
  }

  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {this.SwitchPages()}
          </div>
        </header>
      </div>
    );
  }
}
