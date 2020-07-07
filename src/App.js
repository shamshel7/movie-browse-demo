import React, { Component } from 'react';
import './App.css';
import Tile from './Tile';

const apiKey = "6cd24402a0302e3560524e21ec35bb5d";
const familyGenreId = 10751;
const documentaryGenreId = 99;

const urls = {
    popular_movies: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    popular_series: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
    family: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${familyGenreId}`,
    documentary: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${documentaryGenreId}`
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popularMovies: [],
            popularSeries: [],
            family: [],
            documentary: []
        }
    }

    componentDidMount() {
        this.getIds();
    }

    /**
     * Render a carousel based on an array of IDs
     * @param {string} type 
     */
    renderTiles(type) {
        switch (type) {
            case "PopularMovies":
                return (
                    this.state.popularMovies.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
            case "PopularSeries":
                return (
                    this.state.popularSeries.map((id) => (
                        <Tile key={id} id={id} type={"tv"}/>
                    ))
                );
            case "Family":
                return (
                    this.state.family.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
            case "Documentary":
                return (
                    this.state.documentary.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
            default:
                console.log("No IDs found!");
                break;
        }
    }
    
    render() {
        return (
        <div className="App">
            <div className="AppTitle">
                Demo App
            </div>
            <div className="Section">
                <div className="SectionTitle">Popular Movies</div>
                <div>
                    {this.renderTiles("PopularMovies")}
                </div>
            </div>
            <div className="Section">
                <div className="SectionTitle">Popular Series</div>
                <div>
                    {this.renderTiles("PopularSeries")}
                </div>
            </div>
            <div className="Section">
                <div className="SectionTitle">Family</div>
                <div>
                    {this.renderTiles("Family")}
                </div>
            </div>
            <div className="Section">
                <div className="SectionTitle">Documentary</div>
                <div>
                    {this.renderTiles("Documentary")}
                </div>
            </div>
        </div>
        );
    }

    /**
     * Fetch IDs according to the @urls object, and save them to state
     */
    getIds() {
        Object.entries(urls).map(([key, value]) => {
            fetch(value)
            .then((res) => res.json())
            .then((data) => {
                var ids = [];
                data.results.map((movie) => {
                    ids.push(movie.id);
                });
                switch (key) {
                    case "popular_movies":
                        this.setState({
                            popularMovies: ids
                        });
                        break;
                    case "popular_series":
                        this.setState({
                            popularSeries: ids
                        });
                        break;
                    case "family":
                        this.setState({
                            family: ids
                        });
                        break;
                    case "documentary":
                        this.setState({
                            documentary: ids
                        });
                        break;
                    default:
                        break;
                }
                
            })    
            .catch(error => {
                console.log("Error fetching data", error);
            });
        });
    }
}

export default App;
