import React, { Component } from "react";

class SearchBar extends Component {
  constructor() {
    super();

    this.handleOnKeyUp = this.keyUpHandler.bind(this, "LoginInput");
  }

  /**
   * Handel keup event, sends data to filter update
   */
  keyUpHandler(refName, e) {
    this.props.onFilterUpdate(e.target.name, e.target.value);
  }

  render() {
    return (
      <input
        onKeyUp={this.handleOnKeyUp}
        type="text"
        placeholder="Search Pokemon Name"
        name="name"
        className="form-control"
      />
    );
  }
}

export default SearchBar;
