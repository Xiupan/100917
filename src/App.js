import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import apikey from './apikey'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchQuery: "",
      images: []
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`https://api.unsplash.com/search/photos?client_id=${apikey}&page=1&query=${this.state.searchQuery}`)
    .then(r => {
      return r.json()
    }).then(data => {
      console.log(data.results)
      this.setState({
        images: data.results
      })
    })
  }

  render() {
    const elements = this.state.images.map(image => {
      return(
        <div key={image.id}>
          <img src={image.urls.small} alt={image.id}/>
        </div>
      )
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleSearchChange} value={this.state.searchQuery} placeholder="Search"/>
          <button type="Submit">Submit</button>
        </form>
        {elements}
      </div>
    );
  }
}

export default App;
