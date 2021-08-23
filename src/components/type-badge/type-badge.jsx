import React, { Component } from "react";
import "./type-badge.scss";

class TypeBadge extends Component {
  render() {
    const type = this.props.type;
    const badgeClasses = `type-badge ${type.toLowerCase()}`;
    return <span className={badgeClasses}>{type}</span>;
  }
}

export default TypeBadge;
