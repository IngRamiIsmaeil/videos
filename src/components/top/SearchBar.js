import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchedVideoTerm: '' };
    }

    onInputChange = (e) => {
        this.setState({ searchedVideoTerm: e.target.value })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSearch(this.state.searchedVideoTerm);
    }

    render() {
        return (
            <div className="search-bar ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="ui fluid massive icon input field">
                        <input type="text" placeholder="Search Videos" value={this.state.searchedVideoTerm} onChange={this.onInputChange} />
                        <i className="search icon"></i>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchBar;