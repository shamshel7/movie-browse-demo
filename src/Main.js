import React, { Component } from 'react';
import './Main.css';
import SearchBar from './SearchBar';
import Tile from './Tile';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const apiKey = "6cd24402a0302e3560524e21ec35bb5d";
const familyGenreId = 10751;
const documentaryGenreId = 99;

// URLs for getting movie/series details
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
            searchMovies: [],
            searchSeries: [],
            searching: false,
            searchTerm: null,
            width: 0,
            noOfTiles: 5
        }

        this.searchBar = React.createRef();

        this.home = this.home.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.beginSearch = this.beginSearch.bind(this);
        this.endSearch = this.endSearch.bind(this);
    }

    /**
     * This logs when a prop or state changes, which can be helpful for debugging.
     * @param {*} prevProps 
     * @param {*} prevState 
     */
    componentDidUpdate(prevProps, prevState) {
        Object.entries(this.props).forEach(([key, val]) =>
          prevProps[key] !== val && console.log(`Prop '${key}' changed`)
        );
        if (this.state) {
          Object.entries(this.state).forEach(([key, val]) =>
            prevState[key] !== val && console.log(`State '${key}' changed`)
          );
        }
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
    renderCarousel(type) {
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
            case "SearchMovies":
                tiles = (
                    this.state.searchMovies.map((id) => (
                        <Tile key={id} id={id} type={"movie"}/>
                    ))
                );
                break;
            case "SearchSeries":
                tiles = (
                    this.state.searchSeries.map((id) => (
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

    /**
     * Render the sections of the main page
     */
    renderSections() {
        return (
            <div className="Tiles">
                <div className="Section">
                    <div className="SectionTitle">Popular Movies</div>
                    <div>
                        {this.renderCarousel("PopularMovies")}
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionTitle">Popular Series</div>
                    <div>
                        {this.renderCarousel("PopularSeries")}
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionTitle">Family</div>
                    <div>
                        {this.renderCarousel("FamilyMovies")}
                        {this.renderCarousel("FamilySeries")}
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionTitle">Documentary</div>
                    <div>
                        {this.renderCarousel("DocumentaryMovies")}
                        {this.renderCarousel("DocumentarySeries")}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Render the search results when performing a search
     */
    renderSearch() {
        return (
            <div className="Tiles">
                <div className="Section">
                    <div className="SectionTitle"><strong>Search results: </strong>{this.state.searchTerm}</div>
                </div>
                <div className="Section">
                    <div>
                        Movies
                        {this.renderCarousel("SearchMovies")}
                    </div>
                    <div>
                        TV Series
                        {this.renderCarousel("SearchSeries")}
                    </div>
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <div className="Main">
                <div className="TopBar">
                    <div className="AppTitle" onClick={this.home}>
                        Demo App
                    </div>
                    <SearchBar searching={this.state.searching} beginSearch={this.beginSearch} endSearch={this.endSearch} ref={this.searchBar}/>
                </div>
                {this.state.searching === true ? this.renderSearch() : this.renderSections()}
            </div>
        );
    }

    /**
     * Return to home page
     */
    home() {
        this.setState({
            searching: false
        });
        this.searchBar.current.exit();
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
                data.results.map((item) => {
                    ids.push(item.id);
                    return true;
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
            return true;
        });
    }

    /**
     * Update how many tiles to show on a row based on the width of the screen
     */
    updateWindowDimensions() {
        this.setState({
            noOfTiles: Math.floor(window.innerWidth / 280)
        });
    }

    beginSearch(newSearchTerm) {
        // If new search term is empty, end search
        if (newSearchTerm === "") {
            this.setState({
                searching: false
            });
            return;
        }

        // Assign new search term to state, and begin searching if not already
        this.setState({
            searchTerm: newSearchTerm,
            searching: true
        });

        // Fetch data and assign to state
        const searchUrls = {
            movies_search: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`,
            series_search: `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&page=1&query=${this.state.searchTerm}&include_adult=false`
        };

        Object.entries(searchUrls).map(([key, value]) => {
            fetch(value)
            .then((res) => res.json())
            .then((data) => {
                var ids = [];
                data.results.map((item) => {
                    ids.push(item.id);
                    return true;
                });
                switch (key) {
                    case "movies_search":
                        this.setState({
                            searchMovies: ids
                        });
                        break;
                    case "series_search":
                        this.setState({
                            searchSeries: ids
                        });
                        break;
                    default:
                        console.log("No IDs found!");
                        break;
                }
                
            })
            .catch((error) => {
                console.log("No IDs found in search!");

            })
            return true;
        });
    }

    /**
     * End search, triggering return to main screen.
     */
    endSearch() {
        this.setState({
            searching: false
        });
    }
}

export default Main;
