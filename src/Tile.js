import React, {Component} from 'react';
import './Tile.css';

const apiKey = "6cd24402a0302e3560524e21ec35bb5d";
const imagePathStart = `http://image.tmdb.org/t/p/w500`;

class Tile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            posterPath: null,
            runtime: null
        };
    }

    componentDidMount() {
        this.getTileInfo();
    }

    /**
     * Fetches movie details based on the id prop passed to the component
     */
    getTileInfo() {
        const url = `https://api.themoviedb.org/3/${this.props.type}/${this.props.id}?api_key=${apiKey}&language=en-US`;

        fetch(url).then((res) => res.json())
            .then((data) => {
                if (data == null) {
                    console.log("URL returned no data");
                }
                var titleOrName = data.title != null ? data.title : data.name; // Movies have a "title", but TV series have a "name"
                this.setState({
                    title: this.checkLength(titleOrName),
                    posterPath: data.poster_path,
                    runtime: this.props.type === "movie" ? this.getDuration(data.runtime) : (data.number_of_episodes + " episodes")
                })
            })
            .catch((error) => {
                console.log("An error occured fetching the data", error);
            });
    }

    render() {
        return(
            <div
                className="Tile"
                style={{
                    backgroundImage: 'url("' + imagePathStart + this.state.posterPath + '")',
                    backgroundSize: "cover"
                }}
                onClick={() => this.handleClick()}
            >
                <p className="Title">{this.state.title}</p>
                <p className="Runtime">{this.state.runtime}</p>
            </div>
        );
    }

    handleClick() {
        console.log("Clicked " + this.state.title);
    }

    /**
     * Truncates the title string if too long
     * @param {string} fullString 
     */
    checkLength(fullString) {
        if (fullString == null) {
            console.log("ID: " + this.props.id + " is undefined");
        }
        const maxTitleLength = 40;
        if (fullString.length > maxTitleLength) {
            fullString = fullString.substring(0, maxTitleLength - 1) + "...";
        }

        return fullString;
    }

    /**
     * A function which returns a string representing the run time in hours and minutes
     * @param {number} time 
     */
    getDuration(time) {
        var hours = Math.floor(time / 60);
        var mins = time % 60;
        var runtime = hours + "h " + mins + "mins";

        return runtime;
    }
}

export default Tile;