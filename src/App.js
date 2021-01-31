import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "", searchResults: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    const key = "a932735c";
    const apiUrl = `http://www.omdbapi.com/?apikey=${key}&s=`;
    fetch(apiUrl + this.state.inputValue)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Search);
        this.setState({ searchResults: data.Search });
      });
    event.preventDefault();
  }

  render() {
    const results = this.state.searchResults.map((entry) => {
      return (
        <li>
          Title: {entry.Title}, Year: {entry.Year}, IMDB id: {entry.imdbID}
        </li>
      );
    });

    return (
      <div>
        <h1>Find a Movie!</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search by title </label>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            name="search"
          />
          <input type="submit" value="Submit" />
        </form>

        <ul>{results}</ul>
      </div>
    );
  }
}

export default App;
