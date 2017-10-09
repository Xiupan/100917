import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import apikey from './apikey'
import {connect} from 'react-redux'

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
      console.log("data.results", data.results)
      console.log("this.props.images", this.props.images)
      this.props.dispatch({
        type: "GET_IMAGES",
        images: data.results
      })
    })
  }

  render() {
    const elements = this.props.images.map(image => {
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
          <h1 className="App-title">Unsplash API Project Thing</h1>
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

const mapStateToProps = state => {
  return {
    images: state.images,
    searchQuery: state.query
  }
}
export default connect(mapStateToProps)(App);
