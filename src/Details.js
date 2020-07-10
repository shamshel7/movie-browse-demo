import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Details.css';

const apiKey = "6cd24402a0302e3560524e21ec35bb5d";
const imagePathStart = `http://image.tmdb.org/t/p/w500`;

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            overview: "",
            posterPath: "",
            genres: [],
            releaseDate: "",
            runtime: null,
            episodes: null,
            originalLanguage: ""
        }
    }

    componentDidMount() {
        this.getDetails(this.props.match.params.type, this.props.match.params.id);
    }

    render() {
        return (
            <div className="Details">
                <span className="Info">
                    <div className="DetailsTitle">
                        {this.state.title}
                    </div>
                    <div className="DetailsRuntimeOrEpisodes">
                        {this.props.match.params.type === 'movie' ? this.state.runtime : this.state.episodes}
                    </div>
                    <div className="Overview">
                        {this.state.overview}
                    </div>
                    <hr color="#bbbbbb"/>
                    <div className="Genres">
                        {this.state.genres.map((genre) => {
                            if (genre.name === this.state.genres[this.state.genres.length - 1].name) {
                                return genre.name;
                            } else {
                                return genre.name + ", ";
                            }
                        })}
                    </div>
                    <div className="ReleaseDate">
                        {this.props.match.params.type === 'movie' ? <strong>Release date: </strong> : <strong>Last episode: </strong>}{this.state.releaseDate !== null ? this.state.releaseDate : "Unknown"}
                    </div>
                    <div className="OriginalLanguage">
                        <strong>Original Language: </strong>{this.state.originalLanguage ? this.state.originalLanguage.toUpperCase() : "Unknown"}
                    </div>
                    <Link to={"/watch/" + this.props.match.params.id}>
                        <div className="PlayButton">
                            PLAY
                        </div>
                    </Link>
                </span>
                <span className="Poster">
                    <img src={imagePathStart + this.state.posterPath} alt="Poster"/>
                </span>
            </div>
        );
    }

    /**
     * Fetches data from URL and assigns it to state.
     * @param {string} type 
     * @param {number} id 
     */
    getDetails(type, id) {
        const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    title: this.props.match.params.type === 'movie' ? data.title : data.name,
                    overview: data.overview,
                    posterPath: data.poster_path,
                    genres: data.genres,
                    releaseDate: this.props.match.params.type === 'movie' ? data.release_date : data.last_air_date,
                    runtime: type === 'movie' ? this.getRuntime(data.runtime) : null,
                    episodes: type === 'tv' ? (data.number_of_episodes + " episodes") : null,
                    originalLanguage: data.original_language
                })
            })

    }

    /**
     * Returns a string representing the runtime in hours and minutes
     * @param {number} time 
     */
    getRuntime(time) {
        var hours = Math.floor(time / 60);
        var mins = time % 60;
        var runtime = hours + "h " + mins + "mins";

        return runtime;
    }
}

export default Details;