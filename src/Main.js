import React, { Component } from 'react';
import './Main.css';
import Tile from './Tile';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const apiKey = "6cd24402a0302e3560524e21ec35bb5d";
const familyGenreId = 10751;
const documentaryGenreId = 99;

const urls = {
    popular_movies: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    popular_series: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
    family_movies: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${familyGenreId}`,
    family_series: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${familyGenreId}&include_null_first_air_dates=false`,
    documentary_movies: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${documentaryGenreId}`,
    documentary_series: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${documentaryGenreId}&include_null_first_air_dates=false`
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popularMovies: [],
            popularSeries: [],
            familyMovies: [],
            familySeries: [],
            documentaryMovies: [],
            documentarySeries: [],
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
              slidesToSlide: this.state.noOfTiles, // optional, default to 1.
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
            case "FamilyMovies":
                tiles = (
                    this.state.familyMovies.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
                break
            case "FamilySeries":
                tiles = (
                    this.state.familySeries.map((id) => (
                        <Tile key={id} id={id} type={"tv"}/>
                    ))
                );
                break
            case "DocumentaryMovies":
                tiles = (
                    this.state.documentaryMovies.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
                break;
            case "DocumentarySeries":
                tiles = (
                    this.state.documentarySeries.map((id) => (
                        <Tile key={id} id={id} type={"tv"}/>
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
        <div className="Main">
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
                    {this.renderTiles("FamilyMovies")}
                    {this.renderTiles("FamilySeries")}
                </div>
            </div>
            <div className="Section">
                <div className="SectionTitle">Documentary</div>
                <div>
                    {this.renderTiles("DocumentaryMovies")}
                    {this.renderTiles("DocumentarySeries")}
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
                    case "family_movies":
                        this.setState({
                            familyMovies: ids
                        });
                        break;
                    case "family_series":
                        this.setState({
                            familySeries: ids
                        });
                        break;
                    case "documentary_movies":
                        this.setState({
                            documentaryMovies: ids
                        });
                        break;
                    case "documentary_series":
                        this.setState({
                            documentarySeries: ids
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

export default Main;
