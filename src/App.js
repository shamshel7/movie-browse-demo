import React, { Component } from 'react';
import './App.css';
import Tile from './Tile';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const apiKey = "6cd24402a0302e3560524e21ec35bb5d";
const familyGenreId = 10751;
const documentaryGenreId = 99;

//var noOfTiles = Math.floor(this.state.width / 250);

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
            documentary: [],
            width: 0,
            noOfTiles: 5
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.getIds();

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    /**
     * Render a carousel based on an array of IDs
     * @param {string} type 
     */
    renderTiles(type) {
        var responsive = {
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: this.state.noOfTiles,
              slidesToSlide: 5, // optional, default to 1.
              partialVisibilityGutter: 40
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1 // optional, default to 1.
            }
        };

        var tiles;
        switch (type) {
            case "PopularMovies":
                tiles = (
                    this.state.popularMovies.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
                break;
            case "PopularSeries":
                tiles = (
                    this.state.popularSeries.map((id) => (
                        <Tile key={id} id={id} type={"tv"}/>
                    ))
                );
                break;
            case "Family":
                tiles = (
                    this.state.family.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
                break
            case "Documentary":
                tiles = (
                    this.state.documentary.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
                break;
            default:
                console.log("No IDs found!");
                break;
        }
        
        return (
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                /* transitionDuration={500} */
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                centerMode={true}
            >
                {tiles}
            </Carousel>
        );
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

    updateWindowDimensions() {
        this.setState({
            noOfTiles: Math.floor(window.innerWidth / 280)
        });
      }
}

export default App;
