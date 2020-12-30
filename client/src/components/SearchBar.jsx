import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
            <form className="SearchBar">
                <input
                    type="text"
                    placeholder="Search your movies..."></input>
                    <button>Search</button>
            </form>
        </div>
    )

}

export default SearchBar;