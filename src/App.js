import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="AppTitle">
          ReactFlix
        </div>
        <div className="PopularMovies">
          Popular Movies
        </div>
        <div className="PopularSeries">
          Popular Series
        </div>
        <div className="Family">
          Family
        </div>
        <div className="Documentary">
          Documentary
        </div>
      </div>
    );
  }   
}

export default App;
