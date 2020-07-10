import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "Search",
            searching: this.props.searching
        }

        this.handleChange = this.handleChange.bind(this);
        this.barActive = this.barActive.bind(this);
        this.barInactive = this.barInactive.bind(this);
        this.exit = this.exit.bind(this);
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="Back" style={this.state.searching ? {opacity: 1} : {opacity: 0}} onClick={this.exit}>
                    EXIT SEARCH <strong>X</strong>
                </div>
                <div className="SearchBarBox">
                    <input type="text" value={this.state.searchValue} onChange={this.handleChange} onFocus={this.barActive} onBlur={this.barInactive}/>
                </div>
            </div>
        );
    }

    /**
     * Executes when the value in the search bar changes.
     * 
     * @param {string} event 
     */
    handleChange(event) {
        // Checks if search term has just been deleted, and if so returns to main screen
        if (event.target.value === "" && this.state.searching === true) {
            this.setState({
                searching: false
            })
        }

        // Set state to new value
        this.setState({
            searchValue: event.target.value
        });

        // Passes search term to Main component if not empty
        if (this.state.searchValue !== ("Search" || "")) {
            if (this.state.searching === false) {
                this.setState({
                    searching: true
                });
            }
            this.props.beginSearch(event.target.value);
        }
    }

    /**
     * Removes placeholder "Search" when search bar is clicked.
     */
    barActive() {
        if (this.state.searchValue === "Search") {
            this.setState({
                searchValue: ""
            });
        }
    }

    /**
     * Returns "Search" placeholder when search bar is left empty.
     */
    barInactive() {
        if (this.state.searchValue === "") {
            this.setState({
                searchValue: "Search"
            })
        }
    }

    /**
     * Tells Main component to end searching and returns Search component to default state.
     */
    exit() {
        this.props.endSearch();
        this.setState({
            searchValue: "Search",
            searching: false
        })
    }
}

export default SearchBar;
